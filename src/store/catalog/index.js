import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      loading: false,
    };
  }

  async load(skip) {
    try {
      this.setState(
        {
          ...this.getState(),
          loading: true,
        },
        `Загружаются товары из АПИ`
      );
      const response = await fetch(
        `/api/v1/articles?limit=10&skip=${skip}&fields=items(_id, title, price),count`
      );
      const json = await response.json();

      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          count: json.result.count,
        },
        "Загружены товары из АПИ"
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.setState(
        {
          ...this.getState(),
          loading: false,
        },
        `Загрузка товаров из АПИ завершена`
      );
    }
  }
}

export default Catalog;
