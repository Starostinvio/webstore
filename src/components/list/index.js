import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({
  list,
  showBasketProducts,
  actionBasket,
  actionBasketTitle,
  totalPrice,
  basket,
}) {
  return (
    <div className={showBasketProducts ? "List-basket" : "List"}>
      <div className={showBasketProducts ? "List-basket-box" : ""}>
        {!basket.length && showBasketProducts ? (
          <div className="List-empty-basket">
            <p>{"Корзина пуста :("}</p>
          </div>
        ) : (
          ""
        )}
        {list.map((item) => (
          <div key={item.code} className="List-item">
            <Item
              item={item}
              actionBasket={actionBasket}
              showBasketProducts={showBasketProducts}
              actionBasketTitle={actionBasketTitle}
              basket={basket}
            />
          </div>
        ))}
      </div>

      {showBasketProducts ? (
        <div className="List-total price">
          <div className="price-title">Итого</div>
          <div className="price-total">{totalPrice(list) + " \u20BD"}</div>
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
  showBasketProducts: PropTypes.bool,
  actionBasketTitle: PropTypes.string,
  totalPrice: PropTypes.func,
  actionBasket: PropTypes.func,
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      addCount: PropTypes.number,
    })
  ),
};

export default React.memo(List);
