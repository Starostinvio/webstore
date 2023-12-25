import * as translations from "./translations";
import { useMemo } from "react";

class I18nServices {
  constructor(services, config = {}) {
    this.services = services;
    this.config = config;
    this.lang = "ru";
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  setLang(lang) {
    this.lang = lang;
    for (const listener of this.listeners) listener(this.lang);
  }

  translate(lang, text, plural) {
    let result =
      translations[lang] && text in translations[lang]
        ? translations[lang][text]
        : text;

    if (typeof plural !== "undefined") {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  t = (text, number) => {
    return this.translate(this.lang, text, number);
  };
}

export default I18nServices;
