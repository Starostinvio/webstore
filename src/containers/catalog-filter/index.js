import { memo, useCallback, useMemo, useEffect } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";
import SelectCategories from "../../components/select-categories";

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    categories: state.catalog.categories,
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    search: state.catalog.params.search,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(
      (sort) => {
        console.log("catalog-filter callback onSort sort", sort);
        return store.actions.catalog.setParams({ sort });
      },
      [store]
    ),
    // Поиск
    onSearch: useCallback(
      (query) => {
        console.log(
          "QUERY catalog-filter callback onSearch query",
          typeof query
        );
        return store.actions.catalog.setParams({ query, page: 1 });
      },
      [store]
    ),
    onCategory: useCallback(
      (search) => {
        console.log("ON CATEGORY search", typeof search);
        return store.actions.catalog.setParams({ search, page: 1 });
      },
      [store]
    ),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: "order", title: "По порядку" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      []
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <SelectCategories
        // options={options.sort}
        categories={select.categories}
        value={select.search}
        onChange={callbacks.onCategory}
      />
      <Select
        options={options.sort}
        categories={select.categories}
        value={select.sort}
        onChange={callbacks.onSort}
      />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={"Поиск"}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t("filter.reset")}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
