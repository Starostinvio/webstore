import { useMemo, useCallback } from "react";
import { useNavigate, useLocation, useHistory } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import AuthButton from "../../components/auth-button";
import BasketTool from "../../components/basket-tool";
import Head from "../../components/head";
import Menu from "../../components/menu";
import PageLayout from "../../components/page-layout";
import SideLayout from "../../components/side-layout";
import LocaleSelect from "../../containers/locale-select";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import AuthForm from "../../components/auth-form";
import { useEffect } from "react";

import AuthServices from "../../containers/auth-services";

function Authentication() {
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
    serverError: state.authentication.serverError,
    waiting: state.authentication.waiting,
    sessionActive: state.authentication.sessionActive,
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    // Обработка перехода на главную
    onNavigate: useCallback(
      (item) => {
        if (item.key === 1) store.actions.catalog.resetParams();
      },
      [store]
    ),
    onSubmit: useCallback(
      (login, password) => store.actions.authentication.login(login, password),
      [store]
    ),
    getToken: useCallback(
      () => store.actions.authentication.getToken(),
      [store]
    ),
    cleanServerError: useCallback(
      () => store.actions.authentication.cleanServerError(),
      [store]
    ),
  };

  const { t } = useTranslate();

  const options = {
    menu: useMemo(() => [{ key: 1, title: t("menu.main"), link: "/" }], [t]),
  };

  useEffect(() => {
    return () => {
      callbacks.cleanServerError();
    };
  }, []);

  useEffect(() => {
    let redirect = location.state?.previousLocation.pathname;
    if (!redirect) redirect = "/profile";
    if (callbacks.getToken()) navigate(redirect, { replace: true });
  }, [select.sessionActive]);

  return (
    <PageLayout>
      <AuthServices />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <SideLayout side="between">
        <Menu items={options.menu} onNavigate={callbacks.onNavigate} />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          t={t}
        />
      </SideLayout>
      <AuthForm
        onSubmit={callbacks.onSubmit}
        waiting={select.waiting}
        serverError={select.serverError}
        getToken={callbacks.getToken}
      />
    </PageLayout>
  );
}

export default Authentication;
