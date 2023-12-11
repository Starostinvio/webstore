import "./style.css";
import { memo } from "react";
import PropTypes from "prop-types";

function Info({ children }) {
  return <div className="Info">{children}</div>;
}

Info.propTypes = {
  children: PropTypes.node,
};

export default memo(Info);
