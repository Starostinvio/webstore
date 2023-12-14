import { useMemo, useCallback } from "react";
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
import { loginRequest } from "../../api-auth/login-request";

function Authentication() {
  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
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
  };

  const { t } = useTranslate();

  const options = {
    menu: useMemo(() => [{ key: 1, title: t("menu.main"), link: "/" }], [t]),
  };
  return (
    <PageLayout>
      <SideLayout side="end" padding="small">
        <AuthButton title="Вход" />
      </SideLayout>
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
      <AuthForm onSubmit={loginRequest} />
    </PageLayout>
  );
}

export default Authentication;
