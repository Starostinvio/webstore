import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import SideLayout from "../../components/side-layout";
import AuthButton from "../../components/auth-button";
import AuthServices from "../../containers/auth-services";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.authentication.makeAuthenticatedRequest();
      store.actions.authentication.cleanServerError();
      store.actions.catalog.initParams();
      store.actions.catalog.initCategories();
    },
    [],
    true
  );

  const { t } = useTranslate();

  const callbacks = {
    getToken: useCallback(
      () => store.actions.authentication.getToken(),
      [store]
    ),
  };

  return (
    <PageLayout>
      <AuthServices />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
