import "./style.css";
import { useState } from "react";

function AuthForm({ onSubmit }) {
  const [login, setLogin] = useState();
  const [pass, setPass] = useState();

  return (
    <form className="AuthForm" onSubmit={onSubmit(login, pass)}>
      <h2>Вход</h2>
      <div className="AuthForm-box">
        <label>
          Логин
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          ></input>
        </label>
        <label>
          Пароль
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          ></input>
        </label>

        {/* {error && <div style={{color: "red"}}>{error}</div>} */}
        <button type="submit">Войти</button>
      </div>
    </form>
  );
}

export default AuthForm;
