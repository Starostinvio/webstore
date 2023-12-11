import { memo, useCallback } from "react";
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    PAGE_WORDS: state.pageLanguage.PAGE_WORDS,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(
      (_id) => store.actions.basket.removeFromBasket(_id),
      [store]
    ),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
    getLink: useCallback(
      (product) => {
        return store.actions.product.getLink(product);
      },
      [store]
    ),
  };

  const renders = {
    itemBasket: useCallback(
      (item, pageWords, getLink) => {
        return (
          <ItemBasket
            item={item}
            onClose={callbacks.closeModal}
            onRemove={callbacks.removeFromBasket}
            pageWords={pageWords}
            getLink={getLink}
          />
        );
      },
      [callbacks.removeFromBasket]
    ),
  };

  return (
    <ModalLayout pageWords={select.PAGE_WORDS} onClose={callbacks.closeModal}>
      <List
        list={select.list}
        pageWords={select.PAGE_WORDS}
        renderItem={renders.itemBasket}
        getLink={callbacks.getLink}
      />
      <BasketTotal sum={select.sum} pageWords={select.PAGE_WORDS} />
    </ModalLayout>
  );
}

export default memo(Basket);
