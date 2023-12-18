import { memo, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { sortCategory } from "../../utils";

function SelectCategories(props) {
  const [categories, setCategories] = useState([]);
  const allProductRef = useRef();
  allProductRef.current = {
    title: "Все",
    _id: "",
    level: 0,
    parent: null,
  };

  const onSelect = (e) => {
    props.onChange(e.target.value);
  };

  useEffect(() => {
    if (props.categories && props.categories.length > 1) {
      setCategories([allProductRef.current, ...sortCategory(props.categories)]);
    }
  }, [props.categories]);

  function addHyphens(number) {
    const hyphens = "- ".repeat(number);
    return hyphens;
  }
  return (
    <select
      className="SelectCategories"
      value={props.value}
      onChange={onSelect}
    >
      {categories.map((item, index) => {
        return (
          <option key={item._id} value={item._id}>
            {addHyphens(item.level) + item.title}
          </option>
        );
      })}
    </select>
  );
}

export default memo(SelectCategories);
