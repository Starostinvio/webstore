import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";
import { Link } from "react-router-dom";

function Item(props) {
  const cn = bem("Item");
  const callbacks = {
    onAdd: (e) => props.onAdd(props.item),
    getLink: (e) => props.getLink(props.item),
  };

  return (
    <div className={cn()}>
      <Link to={callbacks.getLink()} className={cn("title")}>
        {props.item.title}
      </Link>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.pageWords.ADD}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
  pageWords: PropTypes.object,
  getLink: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
