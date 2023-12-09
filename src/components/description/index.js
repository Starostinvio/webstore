import "./style.css";
import { memo } from "react";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";

function Description({ product, addToBasket }) {
  const cn = bem("Description");

  return (
    <div className={cn()}>
      <p>{product?.description}</p>
      <p>
        Страна производитель: <strong>{product?.madeIn.title}</strong>
      </p>
      <p>
        Категория: <strong>{product?.category.title}</strong>
      </p>
      <p>
        Год выпуска: <strong>{product?.dateCreate}</strong>
      </p>
      <h2>Цена: {numberFormat(product?.price)} ₽</h2>

      <button onClick={() => addToBasket(product?._id)}>Добавить</button>
    </div>
  );
}

Description.PropTypes = {
  product: PropTypes.object,
  addToBasket: PropTypes.func,
};

export default memo(Description);
