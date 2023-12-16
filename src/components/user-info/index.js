import "./style.css";
import { memo } from "react";
function UserInfo({ title, userProfile }) {
  return (
    <div className="UserInfo">
      <h2>{title}</h2>
      <p>
        Имя: <strong>{userProfile?.userName}</strong>
      </p>
      <p>
        Телефон: <strong>{userProfile?.phone}</strong>
      </p>
      <p>
        email: <strong>{userProfile?.email}</strong>
      </p>
    </div>
  );
}

export default memo(UserInfo);
