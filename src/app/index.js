import { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Authentication from "./authentication";
import UserProfile from "./user-profile";
import useInit from "../hooks/use-init";
import useStore from "../hooks/use-store";
import UserProfileContainer from "./user-profile-container";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  const store = useStore();
  useInit(
    () => {
      store.actions.authentication.makeAuthenticatedRequest();
    },
    [],
    true
  );
  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Authentication />} />
        <Route path={"/profile"} element={<UserProfileContainer />}>
          <Route path={"/profile"} element={<UserProfile />} />
        </Route>
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
