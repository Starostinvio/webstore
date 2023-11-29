import React from "react";
import { useCallback } from "react";

import List from "./components/list/index.js";
import Controls from "./components/controls/index.js";
import Head from "./components/head/index.js";
import PageLayout from "./components/page-layout/index.js";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */

function App({ store }) {
  const list = store.getState().list;

  const onDeleteItem = useCallback(
    (code) => {
      store.deleteItem(code);
    },
    [store]
  );

  const onSelectItem = useCallback(
    (code) => {
      store.selectItem(code);
    },
    [store]
  );

  const onAddItem = useCallback(() => {
    store.addItem();
  }, [store]);
  // const handlerRemove = (item, e) => {
  //   e.stopPropagation();
  //   store.deleteItem(item);
  // };

  return (
    // <div className="App">
    //   <div className="App-head">
    //     <Head title="Приложение на чистом JS" />
    //   </div>
    //   <div className="App-controls">
    //     <Controls store={store} />
    //   </div>
    //   <div className="App-center">
    //     <List store={store} />
    //   </div>
    // </div>
    // <PageLayout
    //   // head={<Head title={"Приложение на чистом JS"} />}
    //   // controls={<Controls store={store} />}
    //   // content={<List store={store} />}
    //   content={
    //     <>

    //     </>
    //   }
    // />
    <PageLayout>
      <Head title={"Приложение на чистом JS"} />
      {/* <Controls store={store} /> */}
      <Controls onAdd={onAddItem} />
      <List
        list={list}
        onDeleteItem={onDeleteItem}
        onSelectItem={onSelectItem}
      />
    </PageLayout>
  );
}

export default App;
