import { useState } from "react";

export default function useBasket() {
  const [showBasket, setShowBasket] = useState(false);
  const [basket, setBasket] = useState([]);

  const totalPrice = (basket, products) => {
    let resultPrice = 0;
    for (let name of basket) {
      const currentProduct = products.find((item) => item.code === name.code);
      resultPrice += currentProduct.price * name.addCount;
    }

    return resultPrice;
  };

  return {
    showBasket,
    setShowBasket,
    basket,
    setBasket,
    totalPrice,
  };
}
