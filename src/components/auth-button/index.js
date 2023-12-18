import "./style.css";
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
function AuthButton({ title, action, location }) {
  const navigate = useNavigate();
  const handlerAction = () => {
    if (title === "Вход")
      return navigate("/login", { state: { previousLocation: location } });
    action();
  };

  return (
    <button className="AuthButton" onClick={handlerAction}>
      {title}
    </button>
  );
}

export default memo(AuthButton);
