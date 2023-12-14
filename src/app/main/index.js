import { memo } from "react";
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

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  // useInit(
  //   () => {
  //     store.actions.catalog.initCategories();
  //   },
  //   [],
  //   true
  // );

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.catalog.initCategories();
    },
    [],
    true
  );

  const { t } = useTranslate();

  return (
    <PageLayout>
      <SideLayout side="end" padding="small">
        <AuthButton title="Вход" />
      </SideLayout>
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
