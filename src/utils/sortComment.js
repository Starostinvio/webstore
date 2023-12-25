export default function listToTreeComment(list, key = "_id", id) {
  let trees = {};
  let roots = {};

  console.log("list function", list);

  for (const item of list) {
    // Добавление элемента в индекс узлов и создание свойства children
    if (!trees[item[key]]) {
      trees[item[key]] = item;
      trees[item[key]].children = [];
      // Ещё никто не ссылался, поэтому пока считаем корнем
      roots[item[key]] = trees[item[key]];
    } else {
      trees[item[key]] = Object.assign(trees[item[key]], item);
    }
      
    // Если элемент имеет родителя, то добавляем его в подчиненные родителя
    if (item.parent?._id && item.parent?._id !== id.id) {
      // Если родителя ещё нет в индексе, то индекс создаётся, ведь _id родителя известен
      if (!trees[item.parent._id]) trees[item.parent[key]] = { children: [] };
      // Добавления в подчиненные родителя
      trees[item.parent[key]].children.push(trees[item[key]]);
      // Так как элемент добавлен к родителю, то он уже не является корневым
      if (roots[item[key]]) delete roots[item[key]];
    }
  }

  return Object.values(roots);
}

// export default function listToTree(list, key = "_id") {
//   console.log("list to tree запустился");
//   let trees = {};
//   let roots = {};

//   for (const item of list) {
//     // Добавление элемента в индекс узлов и создание свойства children
//     if (!trees[item[key]]) {
//       trees[item[key]] = item;
//       trees[item[key]].children = [];
//       // Ещё никто не ссылался, поэтому пока считаем корнем
//       roots[item[key]] = trees[item[key]];
//     } else {
//       trees[item[key]] = Object.assign(trees[item[key]], item);
//     }

//     // Если элемент имеет родителя, то добавляем его в подчиненные родителя
//     if (item.parent?._id) {
//       // Если родителя ещё нет в индексе, то индекс создаётся, ведь _id родителя известен
//       if (!trees[item.parent._id]) trees[item.parent[key]] = { children: [] };
//       // Добавления в подчиненные родителя
//       trees[item.parent[key]].children.push(trees[item[key]]);
//       // Так как элемент добавлен к родителю, то он уже не является корневым
//       if (roots[item[key]]) delete roots[item[key]];
//     }
//   }

//   return Object.values(roots);
// }
