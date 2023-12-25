import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";

function LoginPrompt({ cancel, setOpenCard, level, onRef }) {
  const [childElement, setChildElement] = useState();
  const location = useLocation();

  useEffect(() => {
    if (onRef) {
      console.log("useEffect сработал", childElement);
      onRef(childElement);
    }
  }, [onRef, childElement]);

  return (
    <div
      ref={(element) => setChildElement(element)}
      className="LoginPrompt"
      style={{ paddingLeft: `${level * 30}px` }}
    >
      <Link className="LoginPrompt-link" to="/login" state={{ back: location }}>
        Войдите
      </Link>
      , чтобы иметь возможность комментировать.{" "}
      <a className="LoginPrompt-link-cancel" onClick={() => setOpenCard(false)}>
        {cancel}
      </a>
    </div>
  );
}

export default LoginPrompt;
