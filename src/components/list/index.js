import { memo } from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, renderItem, pageWords }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item._id} className="List-item">
          {renderItem(item, pageWords)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  renderItem: PropTypes.func,
  pageWords: PropTypes.object,
};

List.defaultProps = {
  renderItem: (item) => {},
};

export default memo(List);
