import { memo, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { useEffect, useState } from "react";
import AuthServices from "../../containers/auth-services";
import UserInfo from "../../components/user-info";
import useInit from "../../hooks/use-init";

function UserProfile() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  useInit(
    () => {
      store.actions.profile.makeProfileRequest();
    },
    [],
    true
  );

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.locale.lang,
    waiting: state.authentication.waiting,
    userData: state.profile.userData,
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

    cleanServerError: useCallback(
      () => store.actions.authentication.cleanServerError(),
      [store]
    ),
  };

  const { t } = useTranslate();

  const options = {
    menu: useMemo(() => [{ key: 1, title: t("menu.main"), link: "/" }], [t]),
  };

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
      <UserInfo title="Профиль" userData={select.userData} />
    </PageLayout>
  );
}

export default memo(UserProfile);
