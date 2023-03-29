export const createSuccessFunction =
  (successes) =>
  ({ numDice, focus, attribute, discipline }) => {
    if (focus) {
      return successes[Number(numDice)][Boolean(focus)][Number(attribute)][
        Number(discipline)
      ];
    } else {
      return successes[Number(numDice)][Boolean(focus)][Number(attribute) + Number(discipline)];
    }
  };

export const normalizeArray = (inputArray) => {
  const arraySum = Array.prototype.reduce.call(
    inputArray,
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const normalizedArray = Array.prototype.map.call(
    inputArray,
    (currentElement) => currentElement / arraySum
  );
  return normalizedArray;
};

export const cumulativeSumArray = (inputArray) => {
  const reversedArray = Array.from(inputArray).reverse();
  let currentSum = 0;
  const reversedCumulativeSum = reversedArray.map(
    (element) => (currentSum += element)
  );
  return reversedCumulativeSum.reverse()
};

// Functions from when the js app did math, soon to be deprecated

// Accepts any number of array-like objects and produces their cartesian product
const getCartesianProduct = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

const D20_FACES = Array(20)
  .fill(0)
  .map((x, i) => i + 1);

const getAllPossibleRolls = (numDice = 2) =>
  getCartesianProduct(...Array(Number(numDice)).fill(D20_FACES));

export const getSuccessFrequencyTable = (
  attribute,
  discipline,
  applicable_focus = false,
  numDice = 2
) => {
  attribute = Number(attribute);
  discipline = Number(discipline);
  applicable_focus = Boolean(applicable_focus);
  numDice = Number(numDice);
  const dc = attribute + discipline;

  // The set of all possible rolls (combinations of dice) in the pool
  const possible_rolls = getAllPossibleRolls(numDice);

  // An array, for each position i, there are a_i ways to get i successes
  const successes_table = Array(2 * numDice + 1).fill(0);
  Array.prototype.forEach.call(possible_rolls, (dice) => {
    let successes = 0;
    Array.prototype.forEach.call(dice, (die) => {
      if (die <= dc) {
        successes += 1;
      }
      if (die == 1 || (applicable_focus && die <= discipline)) {
        successes += 1;
      }
    });
    successes_table[successes] += 1;
  });
  return successes_table;
};

export const getSuccessProbabilityTable = (successTable) => {
  // An array, for each position i, a_i is the proportion of outcomes giving a successes
  const normalized_table = Array.prototype.map.call(
    successTable,
    (x) => x / possible_rolls.length
  );
  return normalized_table;
};
