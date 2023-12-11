import { memo, useCallback, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Description from "../../components/description";
import LanguageToggle from "../../components/language-toggle";
import Info from "../../components/info";
import MainMenu from "../../components/main-menu";
import Loading from "../../components/loading";

function ProductDescription() {
  const { product, id } = useParams();
  const store = useStore();
  const location = useLocation();
  const fullNameProduct = product + location.hash;

  useEffect(() => {
    if (select.list.length === 0) store.actions.catalog.load();
    store.actions.product.loadProduct(id);
  }, [id]);

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
    activeRU: useCallback(() => {
      store.actions.pageLanguage.activeRU();
    }),
    activeEN: useCallback(() => {
      store.actions.pageLanguage.activeEN();
    }),
  };

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product.product,
    PAGE_WORDS: state.pageLanguage.PAGE_WORDS,
    loading: state.product.loading,
  }));

  return (
    <PageLayout>
      <Head title={select.product?.title}>
        <LanguageToggle
          activeRU={callbacks.activeRU}
          activeEN={callbacks.activeEN}
          lang={select.PAGE_WORDS.LANG}
        />
      </Head>
      <Info>
        <MainMenu title={select.PAGE_WORDS.MAIN} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          pageWords={select.PAGE_WORDS}
        />
      </Info>
      <Description
        product={select.product}
        addToBasket={callbacks.addToBasket}
        pageWords={select.PAGE_WORDS}
        loading={select.loading}
      />
      {select.loading && <Loading />}
    </PageLayout>
  );
}

export default memo(ProductDescription);
