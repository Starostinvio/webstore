import "./style.css";
import { memo } from "react";
function UserInfo({ title, userData }) {
  return (
    <div className="UserInfo">
      <h2>{title}</h2>
      <p>
        Имя: <strong>{userData?.userName}</strong>
      </p>
      <p>
        Телефон: <strong>{userData?.phone}</strong>
      </p>
      <p>
        email: <strong>{userData?.email}</strong>
      </p>
    </div>
  );
}

export default memo(UserInfo);
