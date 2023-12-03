import React from "react";
import { useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.basket;

  const basketList = list.filter((item) => {
    return store
      .getBasket()
      .find((basketProduct) => item.code === basketProduct.code);
  });

  const callbacks = {
    handlerAddToBasket: useCallback(
      (code) => {
        return store.addToBasket(code);
      },
      [store]
    ),
    handlerRemoveFromBasket: useCallback(
      (code) => {
        return store.removeFromBasket(code);
      },
      [store]
    ),
    toggleShowBasketModal: useCallback(() => {
      return store.toggleShowBasketModal();
    }, [store]),
    totalPrice: useCallback(() => {
      return store.totalPrice();
    }, [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" showBasketModal={callbacks.toggleShowBasketModal} />
      <Controls
        list={list}
        showBasketModal={callbacks.toggleShowBasketModal}
        totalPrice={callbacks.totalPrice}
        basket={basket}
      />

      <List
        list={list}
        actionBasketTitle="Добавить"
        actionBasket={callbacks.handlerAddToBasket}
        basket={basket}
        totalPrice={callbacks.totalPrice}
        showBasketProducts={false}
      />
      {store.getShowBasketModal() && (
        <Modal>
          <Head
            title="Корзина"
            showBasketModal={callbacks.toggleShowBasketModal}
          />
          <List
            list={basketList}
            actionBasketTitle="Удалить"
            actionBasket={callbacks.handlerRemoveFromBasket}
            basket={basket}
            totalPrice={callbacks.totalPrice}
            showBasketProducts={true}
          />
        </Modal>
      )}
    </PageLayout>
  );
}

export default App;
