import StoreModule from "../module";

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      product: null,
      loading: false,
    };
  }

  getLink(product) {
    return `/product/${product._id}`;
  }

  async loadProduct(id) {
    try {
      this.setState(
        {
          ...this.getState(),
          loading: true,
        },
        `Загружается товар ${id} из АПИ`
      );

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
    } catch (error) {
      console.error(error);
    } finally {
      this.setState(
        {
          ...this.getState(),
          loading: false,
        },
        `Загрузка товар ${id} из АПИ завершена`
      );
    }
  }
}

export default Product;
