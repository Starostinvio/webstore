import APIService from "./api";
import Store from "./store";
import createStoreRedux from "./store-redux";
import I18nServices from "./i18n-services";

class Services {
  constructor(config) {
    this.config = config;
    // this._I18n = new I18nServices(this, this.config.i18n);
  }

  get I18n() {
    if (!this._I18n) {
      this._I18n = new I18nServices(this, this.config.i18n);
    }
    return this._I18n;
  }
  /**
   * Сервис АПИ
   * @returns {APIService}
   */
  get api() {
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  /**
   * Сервис Store
   * @returns {Store}
   */
  get store() {
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  /**
   * Redux store
   */
  get redux() {
    if (!this._redux) {
      this._redux = createStoreRedux(this, this.config.redux);
    }
    return this._redux;
  }
}

export default Services;
