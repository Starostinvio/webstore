import { useState } from "react";
import "./style.css";

function SendComment({ openCard, setOpenCard }) {
  const [textValue, setTextValue] = useState();

  const sendComment = (e) => {
    // onSubmit(textValue);
  };
  return (
    <div className="SendComment">
      <div className="SendComment-title">Новый ответ</div>
      <textarea
        className="SendComment-field"
        onChange={(e) => setTextValue(e.target.value)}
      ></textarea>
      <div className="SendComment-button-box">
        <button>Отправить</button>
        {openCard && <button onClick={() => setOpenCard(false)}>Отмена</button>}
      </div>
    </div>
  );
}

export default SendComment;
