import React from "react";
import "./style.css";

function Modal({ children }) {
  return (
    <div className="Modal">
      <div className="Modal-panel">{children}</div>
    </div>
  );
}

export default Modal;
