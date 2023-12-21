import { Link } from "react-router-dom";
import "./style.css";

function LoginPrompt({ cancel, setOpenCard, level }) {
  return (
    <div className="LoginPrompt" style={{ paddingLeft: `${level * 30}px` }}>
      <Link className="LoginPrompt-link" to="/login">
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
