import "./style.css";
import { memo } from "react";
import { Link } from "react-router-dom";
function AuthButton({ title }) {
  return (
    <button className="AuthButton">
      <Link to="/login">{title}</Link>
    </button>
  );
}

export default memo(AuthButton);
