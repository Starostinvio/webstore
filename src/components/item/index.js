import React, { useState } from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import "./style.css";

function Item(props) {
  const [count, setCount] = useState(0);
  const { showBasket, basket, setBasket } = props.useBasket;

  const handlerAddToBasket = (CodeProduct) => {
    if (basket.length > 0 && basket.some((item) => item.code === CodeProduct)) {
      setBasket((product) =>
        product.map((item) => {
          item.code === CodeProduct && item.addCount++;
          return item;
        })
      );
    } else {
      setBasket((product) => [...product, { code: CodeProduct, addCount: 1 }]);
    }
  };

  const handlerRemoveFromBasket = (CodeProduct) => {
    setBasket((products) =>
      products.filter((item) => item.code !== CodeProduct)
    );
  };

  return (
    <div className={"Item" + (props.item.selected ? " Item_selected" : "")}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-price">{`${props.item.price} \u20BD`}</div>

      <div className="Item-actions ">
        {props.showBasketProducts ? (
          <div className="Item-actions-basket">
            <div className="Item-number">
              {basket.find((item) => item.code === props.item.code)?.addCount +
                " шт"}
            </div>
            <div className="Item-delete-box">
              <button
                className="Item-control"
                onClick={() => handlerRemoveFromBasket(props.item.code)}
              >
                Удалить
              </button>
            </div>
          </div>
        ) : (
          <button
            className="Item-control"
            onClick={() => handlerAddToBasket(props.item.code)}
          >
            Добавить
          </button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
};

export default React.memo(Item);
