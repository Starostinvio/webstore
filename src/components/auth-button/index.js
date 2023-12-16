import "./style.css";
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
function AuthButton({ title, action }) {
  const navigate = useNavigate();
  const handlerAction = () => {
    if (title === "Вход") return navigate("/login");
    action();
  };

  return (
    <button className="AuthButton" onClick={handlerAction}>
      {title}
    </button>
  );
}

export default memo(AuthButton);
