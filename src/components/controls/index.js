import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Modal from "../modal";
import Head from "../head";
import List from "../list";
import { plural } from "../../utils";

// function Controls({ onAdd, list, useBasket }) {
function Controls({ list, useBasket }) {
  const { showBasket, setShowBasket, basket, setBasket, totalPrice } =
    useBasket;

  return (
    <div className="Controls">
      <div className="Controls-result">
        <div>В корзине:</div>
        <div className="Controls-total">
          {`${basket.length} 
          ${plural(basket.length, {
            one: "товар",
            few: "товара",
            many: "товаров",
          })} / 
          ${totalPrice(basket, list)} \u20BD `}
        </div>
      </div>
      <button
        className="Controls-open-modal"
        onClick={() => setShowBasket((state) => !state)}
      >
        Перейти
      </button>
      {showBasket && (
        <Modal>
          <Head title={"Корзина"} useBasket={{ setShowBasket }} />
          <List list={list} useBasket={useBasket} showBasketProducts={1} />
        </Modal>
      )}
    </div>
  );
}

export default React.memo(Controls);
