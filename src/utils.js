// export function addPlural(counter, word = "раз") {
//   let plural = "";
//   counter += "";

//   if (counter.at(-1) < 5 && counter.at(-1) > 1) {
//     counter.at(-2)?.includes(1) || (plural = "a");
//   }

//   return counter + " " + word + plural;
// }

export function plural(value, variants = {}, locale = "ru-RU") {
  const key = new Intl.PluralRules(locale).select(value);

  return variants[key] || "";
}

// function makeGenerateCode(start = 0) {
//   return () => {
//     return ++start;
//   };
// }

// export const generateCode = makeGenerateCode();

export const generateCode = function makeGenerateCode(start = 0) {
  return () => {
    return ++start;
  };
};
