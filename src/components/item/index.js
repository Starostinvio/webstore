import React, { useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { plural } from "../../utils";
import "./style.css";

function Item(props) {
  const { basket } = props.useBasket;
  const cn = bem("Item");

  return (
    <div className={cn() + (props.item.selected ? " Item_selected" : "")}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{`${props.item.price} \u20BD`}</div>

      <div
        className={props.showBasketProducts ? cn("counter") : cn("counter-off")}
      >
        {basket.find((item) => item.code === props.item.code)?.addCount + " шт"}
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
  useBasket: PropTypes.shape({
    basket: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number,
        addCount: PropTypes.number,
      })
    ),
  }),
  actionBasketTitle: PropTypes.string,
  actionBasket: PropTypes.func,
};

Item.defaultProps = {
  actionBasket: () => {},
};

export default React.memo(Item);
