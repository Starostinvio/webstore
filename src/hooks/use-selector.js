<<<<<<< HEAD:src/store/use-selector.js
import useStore from "./use-store";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import shallowequal from "shallowequal";

/**
 * Хук для выборки данных из store и отслеживания их изменения
 * @param selector {Function}
 * @return {*}
 */
export default function useSelector(selector) {
  const store = useStore();

  const [state, setState] = useState(() => selector(store.getState()));
=======
import {useEffect, useLayoutEffect, useMemo, useState} from "react";
import shallowequal from 'shallowequal';
import useStore from "./use-store";

/**
 * Хук для выборки данных из store и отслеживания их изменения
 * @param selectorFunc {Function}
 * @return {*}
 */
export default function useSelector(selectorFunc) {
  const store = useStore();

  const [state, setState] = useState(() => selectorFunc(store.getState()));
>>>>>>> 0fe02a795006318a9dd0318710fa5fa608ef246f:src/hooks/use-selector.js

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return store.subscribe(() => {
<<<<<<< HEAD:src/store/use-selector.js
      const newState = selector(store.getState());
      setState((prevState) =>
        shallowequal(prevState, newState) ? prevState : newState
      );
=======
      const newState = selectorFunc(store.getState());
      setState(prevState => shallowequal(prevState, newState) ? prevState : newState);
>>>>>>> 0fe02a795006318a9dd0318710fa5fa608ef246f:src/hooks/use-selector.js
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useLayoutEffect(() => unsubscribe, [unsubscribe]);

  return state;
}
