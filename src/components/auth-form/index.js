import "./style.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AuthForm({ onSubmit, waiting, serverError, getToken }) {
  const [login, setLogin] = useState();
  const [pass, setPass] = useState();
  const navigate = useNavigate();
  const passRef = useRef();
  const loginRef = useRef();

  const sendForm = (e) => {
    e.preventDefault();
    passRef.current = pass;
    loginRef.current = login;
    onSubmit(login, pass);
  };

  return (
    <form className="AuthForm" onSubmit={sendForm}>
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

        {serverError &&
          passRef.current === pass &&
          loginRef.current === login && (
            <div className={"AuthForm-error"}>{serverError}</div>
          )}
        <button type="submit">Войти</button>
      </div>
    </form>
  );
}

export default AuthForm;
