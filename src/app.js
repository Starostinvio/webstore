import React from "react";
import { useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import useBasket from "./hooks/useBasket";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { showBasket, setShowBasket, basket, setBasket, totalPrice } =
    useBasket();
  const list = store.getState().list;

  const basketList = list.filter((item) => {
    return basket.find((basketProduct) => item.code === basketProduct.code);
  });

  const callbacks = {
    handlerAddToBasket: useCallback(
      (CodeProduct) => {
        if (
          basket.length > 0 &&
          basket.some((item) => item.code === CodeProduct)
        ) {
          setBasket((product) =>
            product.map((item) => {
              item.code === CodeProduct && item.addCount++;
              return item;
            })
          );
        } else {
          setBasket((product) => [
            ...product,
            { code: CodeProduct, addCount: 1 },
          ]);
        }
      },
      [basket]
    ),

    handlerRemoveFromBasket: useCallback(
      (CodeProduct) => {
        setBasket((products) =>
          products.filter((item) => item.code !== CodeProduct)
        );
      },
      [basket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" useBasket={{ setShowBasket }} />
      <Controls
        list={list}
        useBasket={{
          showBasket,
          setShowBasket,
          basket,
          totalPrice,
        }}
      />

      <List
        list={list}
        actionBasketTitle={"Добавить"}
        actionBasket={callbacks.handlerAddToBasket}
        useBasket={{
          showBasket,
          setShowBasket,
          basket,
          totalPrice,
        }}
        showBasketProducts={0}
      />
      {showBasket && (
        <Modal>
          <Head title={"Корзина"} useBasket={{ setShowBasket }} />
          <List
            list={basketList}
            actionBasketTitle={"Удалить"}
            actionBasket={callbacks.handlerRemoveFromBasket}
            useBasket={{
              showBasket,
              setShowBasket,
              basket,
              totalPrice,
            }}
            showBasketProducts={1}
          />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
