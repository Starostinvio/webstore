import { array } from "prop-types";
import "./style.css";
import { memo } from "react";
import { useEffect, useState, useRef } from "react";

function Pagination({ totalProduct, loadPageProducts }) {
  const [selectedButton, setSelectedButton] = useState(1);
  const [showButtons, setShowButtons] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (totalProduct) {
      setTotalPages(Math.floor(totalProduct / 10));
      handlerAddShowButtons();
    }
  }, [totalProduct]);

  useEffect(() => {
    totalPages && handlerAddShowButtons();
  }, [selectedButton, totalPages]);

  const handlerAddShowButtons = () => {
    const allButtons = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

    if (selectedButton < 3) {
      setShowButtons(() =>
        allButtons.filter((page) => page < 4 || page === totalPages)
      );
    } else if (selectedButton > allButtons.at(-3)) {
      setShowButtons(() =>
        allButtons.filter((page) => page === 1 || page > totalPages - 3)
      );
    } else if (selectedButton > 2 && selectedButton < allButtons.at(-2)) {
      setShowButtons(() =>
        allButtons.filter(
          (page) =>
            page === allButtons[0] ||
            page === selectedButton + 1 ||
            page === selectedButton ||
            page === selectedButton - 1 ||
            page === allButtons.at(-1)
        )
      );
    }
  };

  const handlerShowPageProducts = (page) => {
    setSelectedButton(page);
    const skip = (page - 1) * 10;
    loadPageProducts(skip);
  };

  return (
    <div className="Pagination">
      {showButtons.map((item) => {
        return (
          <div key={item}>
            {showButtons.at(-1) === item && selectedButton < totalPages - 2 && (
              <a>...</a>
            )}

            <button
              className={
                item === selectedButton
                  ? "Pagination-button button-active"
                  : "Pagination-button"
              }
              // key={item}
              onClick={() => handlerShowPageProducts(item)}
            >
              {item}
            </button>
            {showButtons[0] === item && selectedButton > 3 && <a>...</a>}
          </div>
        );
      })}
    </div>
  );
}

export default memo(Pagination);
