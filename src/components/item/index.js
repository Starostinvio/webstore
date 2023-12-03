import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  return (
    <div className={cn() + (props.item.selected ? " Item_selected" : "")}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{`${props.item.price} \u20BD`}</div>

      <div
        className={props.showBasketProducts ? cn("counter") : cn("counter-off")}
      >
        {props.basket.find((item) => item.code === props.item.code)?.addCount +
          " шт"}
      </div>
      <div className={cn("actions")}>
        <button
          className={cn("control")}
          onClick={() => props.actionBasket(props.item.code)}
        >
          {props.actionBasketTitle}
        </button>
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
  actionBasket: PropTypes.func,
  showBasketProducts: PropTypes.bool,
  actionBasketTitle: PropTypes.string,
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      addCount: PropTypes.number,
    })
  ),
};

Item.defaultProps = {
  actionBasket: () => {},
};

export default React.memo(Item);
