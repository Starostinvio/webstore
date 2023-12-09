import { memo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import LanguageToggle from "../../components/language-toggle";
function Main() {
  const store = useStore();
  const { page } = useParams();

  useEffect(() => {
    const skip = (Number(page) - 1) * 10;
    store.actions.catalog.load(skip);
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    PAGE_WORDS: state.pageLanguage.PAGE_WORDS,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    loadPageProducts: useCallback(
      (skip) => {
        store.actions.catalog.load(skip);
      },
      [store]
    ),
    activeRU: useCallback(() => {
      store.actions.pageLanguage.activeRU();
    }),
    activeEN: useCallback(() => {
      store.actions.pageLanguage.activeEN();
    }),
  };

  const renders = {
    item: useCallback(
      (item, pageWords) => {
        return (
          <Item
            item={item}
            onAdd={callbacks.addToBasket}
            pageWords={pageWords}
          />
        );
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      {/* <Head title="Магазин" /> */}
      <Head title={select.PAGE_WORDS.SHOP}>
        <LanguageToggle
          activeRU={callbacks.activeRU}
          activeEN={callbacks.activeEN}
          lang={select.PAGE_WORDS.LANG}
        />
      </Head>
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        pageWords={select.PAGE_WORDS}
      />
      <List
        list={select.list}
        pageWords={select.PAGE_WORDS}
        renderItem={renders.item}
      />
      <Pagination
        totalProduct={select.count}
        loadPageProducts={callbacks.loadPageProducts}
      />
    </PageLayout>
  );
}

export default memo(Main);
