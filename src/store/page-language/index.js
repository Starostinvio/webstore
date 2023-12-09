import { WORDS } from "../../constantes";
import StoreModule from "../module";

class PageLanguage extends StoreModule {
  initState() {
    return {
      PAGE_WORDS: WORDS.RU,
    };
  }

  activeRU() {
    this.setState(
      {
        ...this.getState(),
        PAGE_WORDS: WORDS.RU,
      },
      "Смена языка страницы на RU"
    );
  }

  activeEN() {
    this.setState(
      {
        ...this.getState(),
        PAGE_WORDS: WORDS.EN,
      },
      "Смена языка страницы на EN"
    );
  }
}

export default PageLanguage;
