import { useState, useEffect, useRef } from "react";
import "./style.css";

function SendComment({ openCard, setOpenCard, sendComment, parentId, onRef }) {
  const [textValue, setTextValue] = useState();
  const [childElement, setChildElement] = useState();
  const textareaRef = useRef(null);

  const handlerSendCommend = (e) => {
    if (textValue && textValue.trim().length > 0) {
      sendComment(textValue, parentId);
      setTextValue("");
      setOpenCard(false);
    }
  };

  useEffect(() => {
    if (onRef) {
      onRef(childElement);
    }
  }, [onRef, childElement]);

  useEffect(() => {
    if (openCard) textareaRef.current.focus();
  }, []);

  return (
    <div ref={(element) => setChildElement(element)} className="SendComment">
      <div className="SendComment-title">
        {openCard ? "Новый ответ" : "Новый комментарий"}
      </div>
      <textarea
        ref={textareaRef}
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
