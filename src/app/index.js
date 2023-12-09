import { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import ProductDescription from "./product-description";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:page" element={<Main />} />

        <Route path="/product/:product" element={<ProductDescription />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;