/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.id = 0;
    initState.list = initState.list.map((item) => {
      item.code = this.id + 1;
      item.counter = 0;
      this.updateId();
      return item;
    });
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  updateId() {
    this.id += 1;
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

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: this.id + 1, title: "Новая запись", counter: 0 },
      ],
    });
    this.updateId();
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          // item.selected = !item.selected;
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
          // item.selected && (item.counter += 1);
        } else {
          // item.selected = false;
          return item.selected ? { ...item, selected: false } : item;
        }
        return item;
      }),
    });
  }
}

export default Store;
