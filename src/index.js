<<<<<<< HEAD
import React from "react";
import { createRoot } from "react-dom/client";
import { generateCode } from "./utils.js";
import App from "./app.js";
import Store from "./store.js";

const store = new Store({
  list: [
    { code: generateCode(), title: "Название товара", price: 100.0 },
    { code: generateCode(), title: "Книга про React", price: 770 },
    { code: generateCode(), title: "Конфета", price: 33 },
    { code: generateCode(), title: "Трактор", price: 7955320 },
    { code: generateCode(), title: "Телефон iPhone XIXV", price: 120000 },
    { code: generateCode(), title: "Карандаши цветные", price: 111 },
    { code: generateCode(), title: "Товар сюрприз", price: 0 },
  ],
});

const root = createRoot(document.getElementById("root"));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
=======
import {createRoot} from 'react-dom/client';
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <App/>
  </StoreContext.Provider>
);
>>>>>>> 1fa7f72c2e0cdd0700e3c37cf21c4041cc0feb68
