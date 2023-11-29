<<<<<<< HEAD
import React from "react";
import "./style.css";
import { plural } from "../../utils/utils.js";
import PropTypes from "prop-types";

function Item({ item, onDelete, onSelect }) {
  const [count, setCount] = useState(0);

  const onClick = () => {
    onSelect(item.code);
    if (!item.selected) {
      setCount(count + 1);
    }
  };

  return (
    <div
      className={"Item" + (item.selected ? " Item_selected" : "")}
      onClick={onClick}
    >
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">
        {item.title}{" "}
        {item.count &&
          ` | Выделяли ${count} ${plural(count, {
            one: "раз",
            few: "раза",
            many: "раз",
          })}`}
      </div>
      <div className="Item-actions">
        <button onClick={(e) => onDelete(item.code)}>Удалить</button>
=======
import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';

function Item(props) {

  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    },
    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);

    }
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}
         onClick={callbacks.onClick}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title} {count ? ` | Выделяли ${count} ${plural(count, {
        one: 'раз',
        few: 'раза',
        many: 'раз'
      })}` : ''}
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onDelete}>
          Удалить
        </button>
>>>>>>> e76a78bcc0df616abef94f7e147e1b037be5aec9
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
<<<<<<< HEAD
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
};
=======
    count: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func
};

Item.defaultProps = {
  onDelete: () => {
  },
  onSelect: () => {
  },
}
>>>>>>> e76a78bcc0df616abef94f7e147e1b037be5aec9

export default React.memo(Item);
