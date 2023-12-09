import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function LanguageToggle({ activeRU, activeEN, lang }) {
  const handlerActionToggle = () => {
    lang === "en-US" ? activeRU() : activeEN();
  };

  return (
    <div className="LanguageToggle">
      <h3>{lang === "en-US" ? "RU" : "EN"}</h3>
      <div className="LanguageToggle-platform">
        <div
          className={
            lang === "en-US"
              ? "LanguageToggle-item active"
              : "LanguageToggle-item"
          }
          onClick={() => handlerActionToggle()}
        ></div>
      </div>
    </div>
  );
}

LanguageToggle.PropTypes = {
  activeRU: PropTypes.func,
  activeEN: PropTypes.func,
  lang: PropTypes.string,
};

export default memo(LanguageToggle);
