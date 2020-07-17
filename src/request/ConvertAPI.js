async function getChangeAPI(valueInit, valueFinal) {
  return await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${valueInit}&tsyms=${valueFinal}`
  ).then((response) => response.json());
}

export const getChange = (valueInit, valueFinal) => {
  return getChangeAPI(valueInit, valueFinal);
};
