import React from "react";
import { useState } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
import Modal from "../modal";
import Head from "../head";
import List from "../list";
import { plural } from "../../utils";

function Controls({ list, useBasket }) {
  const { setShowBasket, basket, totalPrice } = useBasket;
  const cn = bem("Controls");

  return (
    <div className={cn()}>
      <div className={cn("result")}>
        <div>В корзине:</div>

        <div className={cn("total")}>
          {basket.length
            ? `${basket.length} 
          ${plural(basket.length, {
            one: "товар",
            few: "товара",
            many: "товаров",
          })} / 
          ${totalPrice(basket, list)} \u20BD `
            : "пусто"}
        </div>
      </div>
      <button
        className={cn("open-modal")}
        onClick={() => setShowBasket((state) => !state)}
      >
        Перейти
      </button>
    </div>
  );
}

Controls.PropTypes = {
  list: PropTypes.object,
  useBasket: PropTypes.shape({
    setShowBasket: PropTypes.bool,
    basket: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number,
        addCount: PropTypes.number,
      })
    ),
    totalPrice: PropTypes.func,
  }),
};

export default React.memo(Controls);
