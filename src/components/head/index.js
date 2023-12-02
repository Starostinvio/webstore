import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head({ title, useBasket }) {
  const { setShowBasket } = useBasket;

  return (
    <div className="Head">
      <h1>{title}</h1>
      {title === "Корзина" ? (
        <div className="Head__button-box">
          <button onClick={() => setShowBasket((state) => !state)}>
            Закрыть
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
