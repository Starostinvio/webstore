export function plural(value, variants = {}, locale = "ru-RU") {
  const key = new Intl.PluralRules(locale).select(value);

  return variants[key] || "";
}

export const generateCode = (function (start = 0) {
  return () => ++start;
})();

export function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
