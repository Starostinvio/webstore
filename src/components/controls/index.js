import React from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";

function Controls({ list, showBasketModal, totalPrice, basket }) {
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
          ${totalPrice()} \u20BD `
            : "пусто"}
        </div>
      </div>
      <button className={cn("open-modal")} onClick={() => showBasketModal()}>
        Перейти
      </button>
    </div>
  );
}

Controls.PropTypes = {
  list: PropTypes.object,
  showBasketModal: PropTypes.bool,
  totalPrice: PropTypes.func,
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      addCount: PropTypes.number,
    })
  ),
};

export default React.memo(Controls);
