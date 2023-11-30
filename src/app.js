import React from "react";
import { useCallback } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import useBasket from "./hooks/useBasket";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const { showBasket, setShowBasket, basket, setBasket, totalPrice } =
    useBasket();

  return (
    <PageLayout>
      <Head title="Магазин" useBasket={{ setShowBasket }} />
      <Controls
        list={list}
        useBasket={{ showBasket, setShowBasket, basket, setBasket, totalPrice }}
      />

      <List
        list={list}
        useBasket={{ showBasket, setShowBasket, basket, setBasket, totalPrice }}
        showBasketProducts={0}
      />
    </PageLayout>
  );
}

export default App;
