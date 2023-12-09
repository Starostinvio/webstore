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
    };
  }

  async load(skip) {
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
  }

  async loadProduct(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        product: json.result,
      },
      `Загружен товар ${id} из АПИ`
    );
  }
}

export default Catalog;