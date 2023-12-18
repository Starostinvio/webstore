import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class Categories extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
    };
  }
  async initCategories() {
    const response = await fetch(
      "api/v1/categories?fields=_id,title,parent(_id)&limit=*"
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        categories: json.result.items,
      },
      "Загружен список категорий из АПИ"
    );
  }
}

export default Categories;
