import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({
  list,
  useBasket,
  showBasketProducts,
  actionBasket,
  actionBasketTitle,
}) {
  const { basket, totalPrice } = useBasket;

  return (
    <div className={showBasketProducts ? "List-basket" : "List"}>
      <div className={showBasketProducts && "List-basket-box"}>
        {list.map((item) => (
          <div key={item.code} className="List-item">
            <Item
              item={item}
              useBasket={useBasket}
              actionBasket={actionBasket}
              showBasketProducts={showBasketProducts}
              actionBasketTitle={actionBasketTitle}
            />
          </div>
        ))}
      </div>

      {showBasketProducts ? (
        <div className="List-total price">
          <div className="price-title">Итого</div>
          <div className="price-total">
            {totalPrice(basket, list) + " \u20BD"}
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

  useBasket: PropTypes.shape({
    basket: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number,
        addCount: PropTypes.number,
      })
    ),
    totalPrice: PropTypes.func,
  }),
  showBasketProducts: PropTypes.number,
  actionBasketTitle: PropTypes.string,
  actionBasket: PropTypes.func,
};

export default React.memo(List);
