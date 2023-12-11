import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

function ItemBasket(props) {
  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onClose: (e) => props.onClose(),
    getLink: (e) => props.getLink(props.item),
  };

  return (
    <div className={cn()}>
      <Link
        to={callbacks.getLink()}
        className={cn("title")}
        onClick={() => callbacks.onClose()}
      >
        {props.item.title}
      </Link>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} {props.pageWords.PIECE}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>{props.pageWords.DELETE}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  pageWords: PropTypes.object,
  getLink: PropTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
