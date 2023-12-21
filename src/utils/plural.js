/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export default function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function sortCategory(products, id) {
  console.log("sortCategory products", products, id);
  let firstChildren = [];
  let mainParent = products.filter((item) => {
    // console.log("in filter item", item, id);
    // if (item.parent !== id) {
    //   item.level = 1;
    //   firstChildren.push(item);
    // }
    // item.level = 0;
    // return item.parent === id;
    console.log("Сравнение", item.parent._id, id.id);
    if (item.parent._id !== id.id) {
      item.level = 1;
      firstChildren.push(item);
    }
    item.level = 0;
    return item.parent._id === id.id;
  });

  console.log("firstChildren", firstChildren);
  console.log("mainParent", mainParent);

  function childTree(children, parents) {
    let newArray = [];
    let newChildren = [...children];

    for (let i = 0; i < parents.length; i++) {
      newArray.push(parents[i]);
      children.forEach((item) => {
        if (item.parent._id === parents[i]._id) {
          item.level = parents[i].level + 1;
          newArray.push(item);
          const index = newChildren.findIndex(
            (newChild) => newChild._id === item._id
          );
          newChildren.splice(index, 1);
        }
      });
    }

    if (newChildren.length < 1) {
      return newArray;
    }

    return childTree(newChildren, newArray);
  }

  const result = childTree(firstChildren, mainParent);

  return result;
}
