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
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
};

export default React.memo(Item);
