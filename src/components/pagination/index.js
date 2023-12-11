import { PropTypes } from "prop-types";
import "./style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { memo, useEffect, useState, useRef } from "react";

function Pagination({ totalProduct, loadPageProducts }) {
  const [totalPages, setTotalPages] = useState(0);
  const [showButtons, setShowButtons] = useState([]);
  const { page: currentPage = 1 } = useParams();
  const pageRef = useRef();
  pageRef.current = Number(currentPage);

  const navigate = useNavigate();

  useEffect(() => {
    if (totalProduct) {
      setTotalPages(Math.floor(totalProduct / 10));
    }
  }, [totalProduct]);

  useEffect(() => {
    if (pageRef.current == currentPage) {
      const skip = (pageRef.current - 1) * 10;

      loadPageProducts(skip);
      handlerAddShowButtons();
    }
  }, [currentPage]);

  useEffect(() => {
    totalPages && handlerAddShowButtons();
  }, [totalPages]);

  const handlerAddShowButtons = () => {
    const allButtons = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

    if (pageRef.current < 3) {
      setShowButtons(() =>
        allButtons.filter((page) => page < 4 || page === totalPages)
      );
    } else if (pageRef.current > allButtons.at(-3)) {
      setShowButtons(() =>
        allButtons.filter((page) => page === 1 || page > totalPages - 3)
      );
    } else if (pageRef.current > 2 && pageRef.current < allButtons.at(-2)) {
      setShowButtons(() =>
        allButtons.filter(
          (page) =>
            page == pageRef.current + 1 ||
            page == pageRef.current ||
            page == pageRef.current - 1 ||
            page === allButtons[0] ||
            page === allButtons.at(-1)
        )
      );
    }
  };

  const goNextPage = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className="Pagination">
      {showButtons.map((item) => {
        return (
          <div key={item}>
            {showButtons.at(-1) === item &&
              pageRef.current < totalPages - 2 && (
                <a className="Pagination-dots">...</a>
              )}
            <Link
              className={
                item === pageRef.current
                  ? "Pagination-link link-active"
                  : "Pagination-link"
              }
              to={`/${item}`}
            >
              {item}
            </Link>

            {showButtons[0] === item && pageRef.current > 3 && (
              <a className="Pagination-dots">...</a>
            )}
          </div>
        );
      })}
    </div>
  );
}

Pagination.propTypes = {
  totalProduct: PropTypes.number,
  loadPageProducts: PropTypes.func,
};

export default Pagination;
