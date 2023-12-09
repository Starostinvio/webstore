import "./style.css";
import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function MainMenu({ title }) {
  return (
    <nav className="Main-menu">
      <Link to="/">{title}</Link>
    </nav>
  );
}

MainMenu.PropTypes = {
  title: PropTypes.string,
};

export default memo(MainMenu);
