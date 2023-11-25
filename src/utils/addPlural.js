export function addPlural(counter, word = "раз") {
  let plural = "";
  counter += "";

  if (counter.at(-1) < 5 && counter.at(-1) > 1) {
    counter.at(-2)?.includes(1) || (plural = "a");
  }

  return counter + " " + word + plural;
}
