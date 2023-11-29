import React from "react";
import "./style.css";
import { addPlural } from "../../utils/utils.js";
import Item from "../item";
import PropTypes from "prop-types";

// function List({ store }) {
function List({ list, onDeleteItem, onSelectItem }) {
  //   const list = store.getState().list;

  const handlerRemove = (item, e) => {
    e.stopPropagation();
    store.deleteItem(item);
  };
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          <Item item={item} onDelete={onDeleteItem} onSelect={onSelectItem} />
          {/* <div
            className={"Item" + (item.selected ? " Item_selected" : "")}
            onClick={() => store.selectItem(item.code)}
          >
            <div className="Item-code">{item.code}</div>
            <div className="Item-title">
              {item.counter !== 0
                ? item.title + ` | Выделяли ${addPlural(item.counter, "раз")}`
                : item.title}
            </div>
            <div className="Item-actions">
              <button onClick={(e) => handlerRemove(item.code, e)}>
                Удалить
              </button>
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
  onSelectItem: () => {},
};

export default React.memo(List);
