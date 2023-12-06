<<<<<<< HEAD
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
=======
import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd}) {
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>Добавить</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
>>>>>>> 1fa7f72c2e0cdd0700e3c37cf21c4041cc0feb68
