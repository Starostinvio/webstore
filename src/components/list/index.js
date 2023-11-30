import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, useBasket, showBasketProducts }) {
  const { showBasket, setShowBasket, basket, setBasket, totalPrice } =
    useBasket;

  if (showBasketProducts) {
    list = list.filter((item) => {
      return basket.find((basketProduct) => item.code === basketProduct.code);
    });
    console.log("newList", list);
  }

  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item
            item={item}
            useBasket={{ basket, setBasket }}
            showBasketProducts={showBasketProducts}
          />
        </div>
      ))}
      {showBasketProducts ? (
        <div className="List-total price">
          <div className="price-title">Итого</div>
          <div className="price-total">
            {totalPrice(basket, list) + "\u20BD"}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,

  useBasket: PropTypes.node,
};

export default React.memo(List);
