<<<<<<< HEAD
import React from "react";
import PropTypes from "prop-types";
import { formatNumber } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  return (
    <div className={cn() + (props.item.selected ? " Item_selected" : "")}>
      <div className={cn("code")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{`${formatNumber(
        props.item.price
      )} \u20BD`}</div>

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
=======
import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
>>>>>>> 1fa7f72c2e0cdd0700e3c37cf21c4041cc0feb68
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
<<<<<<< HEAD
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
=======
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
>>>>>>> 1fa7f72c2e0cdd0700e3c37cf21c4041cc0feb68
