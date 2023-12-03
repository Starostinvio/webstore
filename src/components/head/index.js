import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head({ title, showBasketModal }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {title === "Корзина" ? (
        <div className="Head__button-box">
          <button onClick={() => showBasketModal()}>Закрыть</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.string,
  showBasketModal: PropTypes.func,
};

export default React.memo(Head);
