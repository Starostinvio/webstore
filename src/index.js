<<<<<<< HEAD
import React from "react";
import { createRoot } from "react-dom/client";
import { createElement } from "./utils.js";
import App from "./app.js";
import Store from "./store.js";

const store = new Store({
  list: [
    { title: "Название элемента" },
    { title: "Некий объект" },
    { title: "Заголовок" },
    { title: "Очень длинное название элемента из семи слов" },
    { title: "Запись" },
    { title: "Шестая запись" },
    { title: "Седьмая запись" },
  ],
});

const root = createRoot(document.getElementById("root"));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
=======
import React from 'react';
import {createRoot} from 'react-dom/client';
import {generateCode} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: generateCode(), title: 'Название товара', price: 100.0},
    {code: generateCode(), title: 'Книга про React', price: 770},
    {code: generateCode(), title: 'Конфета', price: 33},
    {code: generateCode(), title: 'Трактор', price: 7955320},
    {code: generateCode(), title: 'Телефон iPhone XIXV', price: 120000},
    {code: generateCode(), title: 'Карандаши цветные', price: 111},
    {code: generateCode(), title: 'Товар сюрприз', price: 0},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
>>>>>>> e76a78bcc0df616abef94f7e147e1b037be5aec9
