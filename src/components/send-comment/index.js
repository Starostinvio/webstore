import { useState } from "react";
import "./style.css";

function SendComment({ openCard, setOpenCard, sendComment, parentId }) {
  const [textValue, setTextValue] = useState();
  const handlerSendCommend = (e) => {
    if (textValue) {
      sendComment(textValue, parentId);
      setTextValue("");
      setOpenCard(false);
    }
  };

  return (
    <div className="SendComment">
      <div className="SendComment-title">Новый ответ</div>
      <textarea
        className="SendComment-field"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      ></textarea>
      <div className="SendComment-button-box">
        <button onClick={(e) => handlerSendCommend(e)}>Отправить</button>
        {openCard && <button onClick={() => setOpenCard(false)}>Отмена</button>}
      </div>
    </div>
  );
}

export default SendComment;
