import { generateCode } from "./utils";
import { formatNumber } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  basket = [];
  showBasketModal = false;

  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }
  getBasket() {
    return this.basket;
  }

  setBasket(newBasket) {
    this.basket = newBasket;

    for (const listener of this.listeners) listener();
  }

  getShowBasketModal() {
    return this.showBasketModal;
  }
  toggleShowBasketModal() {
    this.showBasketModal = !this.showBasketModal;
    for (const listener of this.listeners) listener();
  }

  totalPrice() {
    let resultPrice = 0;
    for (let name of this.basket) {
      const currentProduct = this.getState().list.find(
        (item) => item.code === name.code
      );

      resultPrice += currentProduct.price * name.addCount;
    }

    return formatNumber(resultPrice);
  }

  addToBasket(CodeProduct) {
    if (
      this.basket.length > 0 &&
      this.basket.some((item) => item.code === CodeProduct)
    ) {
      this.setBasket(
        this.basket.map((item) => {
          item.code === CodeProduct && item.addCount++;
          return item;
        })
      );
    } else {
      this.setBasket([...this.basket, { code: CodeProduct, addCount: 1 }]);
    }
  }

  removeFromBasket(CodeProduct) {
    this.setBasket(this.basket.filter((item) => item.code !== CodeProduct));
  }

  /**
   * Добавление новой записи
   */

  /**
   * Удаление записи по коду
   * @param code
   */

  /**
   * Выделение записи по коду
   * @param code
   */
}

export default Store;
