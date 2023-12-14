import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

function SelectCategories(props) {
  const [categories, setCategories] = useState([
    { title: "Все", hierarchical: "parent", _id: "" },
  ]);
  const onSelect = (e) => {
    console.log("ONSELECT все", e.target.value);
    // if (e.target.value !== 123)
    props.onChange(e.target.value);
  };

  useEffect(() => {
    if (props.categories && props.categories.length > 1) {
      setCategories((state) => [...state, ...sortCategory(props.categories)]);
    }
  }, [props.categories]);

  function sortCategory(items) {
    const mainParent = items.filter((item) => item.parent === null);

    function createArray(parentItem) {
      const arr = [];
      parentItem["hierarchical"] = "parent";
      arr.push(parentItem);

      items.forEach((item) => {
        if (parentItem._id === item.parent?._id) {
          item["hierarchical"] = "first-child";
          arr.push(item);
        }
      });

      return arr;
    }

    let parent = [];
    mainParent.forEach((item) => {
      parent.push(createArray(item));
    });

    parent = [].concat(...parent);

    let children = items.filter((item) => {
      if (!parent.some((parentItem) => parentItem._id === item._id)) {
        item["hierarchical"] = "second-child";
        return true;
      }
    });

    children.forEach((childItem) => {
      parent.splice(
        parent.findIndex((item) => item._id === childItem.parent._id) + 1,
        0,
        childItem
      );
    });

    return parent;
  }
  function determinantOfNesting(hierarchical) {
    switch (hierarchical) {
      case "parent":
        return "";
      case "first-child":
        return "-";
      case "second-child":
        return "--";
      default:
        return "";
    }
  }
  return (
    // <select className="Select" value={props.value} onChange={onSelect}>
    //   {props.options.map((item) => (
    //     <option key={item.value} value={item.value}>
    //       {item.title}
    //     </option>
    //   ))}
    <select className="Select" value={props.value} onChange={onSelect}>
      {categories.map((item, index) => (
        <option key={index} value={item._id}>
          {determinantOfNesting(item.hierarchical) + item.title}
        </option>
      ))}
    </select>
  );
}

// Select.propTypes = {
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//       title: PropTypes.string,
//     })
//   ).isRequired,
//   value: PropTypes.any,
//   onChange: PropTypes.func,
// };

// Select.defaultProps = {
//   onChange: () => {},
// };

export default memo(SelectCategories);
