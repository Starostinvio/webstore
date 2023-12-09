import { memo, useCallback, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Description from "../../components/description";

function ProductDescription() {
  const { product } = useParams();
  const store = useStore();
  const location = useLocation();

  useEffect(() => {
    if (select.list.length === 0) store.actions.catalog.load();
    store.actions.catalog.loadProduct(location.state);
  }, []);

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
  };

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.catalog.product,
    PAGE_WORDS: state.pageLanguage.PAGE_WORDS,
  }));

  return (
    <PageLayout>
      <Head title={product} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        pageWords={select.PAGE_WORDS}
      />
      <Description
        product={select.product}
        addToBasket={callbacks.addToBasket}
      />
    </PageLayout>
  );
}

export default memo(ProductDescription);
