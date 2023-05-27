export function calculateDicePoolFrequencyTable(...dice) {
  dice = Array.prototype.map.call(Array.from(dice), (die) => Array.from(die));
  const results = dice.reduce((accumulator, die) => {
    const nextArrayLength = accumulator.length - 1 + (die.length - 1) + 1;
    const nextArray = Array(nextArrayLength).fill(0);
    die.forEach((dieCount, dieIdx) =>
      accumulator.forEach((accumulatorCount, accumulatorIdx) => {
        const resultIdx = dieIdx + accumulatorIdx;
        const countIncrement = dieCount * accumulatorCount;
        nextArray[resultIdx] += countIncrement;
      })
    );
    return nextArray;
  });
  return results;
}

export function calculateAssistDicePoolFrequencyTable(
  leaderFrequencyTable,
  ...assistDice
) {
  const dice = Array.prototype.map.call(Array.from(assistDice), (die) =>
    Array.from(die)
  );
  const results = dice.reduce((accumulator, die) => {
    const nextArrayLength = accumulator.length - 1 + (die.length - 1) + 1;
    const nextArray = Array(nextArrayLength).fill(0);
    die.forEach((dieCount, dieIdx) =>
      accumulator.forEach((accumulatorCount, accumulatorIdx) => {
        const resultIdx = dieIdx + accumulatorIdx;
        /* Any time the leader's dice pool scores 0 successes
           the assist dice cannot add any any (accumulatorIdx==0 ? 0).
           Instead these scenarios increase the number of ways to get
           0 total successes resultIdx == 0 ? (20 * accumulatorCount).


        */
        const countIncrement =
          resultIdx == 0
            ? 20 * accumulatorCount
            : accumulatorIdx == 0
            ? 0
            : dieCount * accumulatorCount;
        nextArray[resultIdx] += countIncrement;
      })
    );
    return nextArray;
  }, leaderFrequencyTable);
  return results;
}

const castArguments = ({
  numDice = 2,
  focus = false,
  attribute,
  discipline,
  normalize = false,
  atLeast = true,
}) => ({
  numDice: Number(numDice),
  focus: Boolean(focus),
  attribute: Number(attribute),
  discipline: Number(discipline),
  normalize: Boolean(normalize),
  atLeast: Boolean(atLeast),
});

function createSuccessDie({ attribute, discipline, focus = false }) {
  attribute = Number(attribute);
  discipline = Number(discipline);
  focus = Boolean(focus);
  const targetNumber = attribute + discipline;
  const criticalNumber = focus ? discipline : 1;
  const zeroSuccesses = 20 - targetNumber;
  const oneSuccess = targetNumber - criticalNumber;
  const twoSuccesses = criticalNumber;
  return [zeroSuccesses, oneSuccess, twoSuccesses];
}

export function successesFrequencyTable(
  { numDice = 2, focus = false, attribute, discipline, normalize = false },
  assists = undefined
) {
  ({ numDice, focus, attribute, discipline, normalize } = castArguments({
    numDice,
    focus,
    attribute,
    discipline,
    normalize,
  }));
  const successDie = createSuccessDie({ attribute, discipline, focus });
  const leaderDicePool = Array(numDice).fill(successDie);
  const leaderSuccesses = calculateDicePoolFrequencyTable(...leaderDicePool);

  // This only applies in the unusual circumstance where a character has an
  // applicable focus but 0 discipline, meaning they can't score two successes.
  while (leaderSuccesses.at(-1) == 0) {
    leaderSuccesses.pop();
  }
  if (assists) {
    const assistSuccessDice = Array.prototype.map.call(
      assists,
      ([attribute, discipline, focus]) =>
        createSuccessDie({ attribute, discipline, focus })
    );
    const finalSuccesses = calculateAssistDicePoolFrequencyTable(
      leaderSuccesses,
      ...assistSuccessDice
    );
    return normalize ? normalizeArray(finalSuccesses) : finalSuccesses;
  } else {
    return normalize ? normalizeArray(leaderSuccesses) : leaderSuccesses;
  }
}

export function complicationsFrequencyTable({
  numDice = 2,
  complicationsRange = 1,
  normalize = false,
}) {
  numDice = Number(numDice);
  complicationsRange = Number(complicationsRange);
  const complicationsDie = [20 - complicationsRange, complicationsRange];
  const dicePool = Array(numDice).fill(complicationsDie);
  const res = calculateDicePoolFrequencyTable(...dicePool);
  while (res.at(-1) == 0) {
    res.pop();
  }
  return normalize ? normalizeArray(res) : res;
}

export function successesCumulativeTable({
  numDice = 2,
  focus = false,
  attribute,
  discipline,
  normalize = false,
  atLeast = true,
}) {
  ({ numDice, focus, attribute, discipline, normalize, atLeast } =
    castArguments({
      numDice,
      focus,
      attribute,
      discipline,
      normalize,
      atLeast,
    }));
  const exact = successesFrequencyTable({
    numDice,
    focus,
    attribute,
    discipline,
    normalize,
  });
  const proportion = cumulativeSumArray(exact, atLeast);
  return proportion;
}

export function complicationsCumulativeTable({
  numDice = 2,
  complicationsRange = 1,
  atLeast = false,
  normalize = false,
}) {
  [numDice, complicationsRange, atLeast, normalize] = [
    Number(numDice),
    Number(complicationsRange),
    Boolean(atLeast),
    Boolean(normalize),
  ];
  const exact = complicationsFrequencyTable({
    numDice,
    complicationsRange,
    normalize,
  });
  const cumulative = cumulativeSumArray(exact, atLeast);
  return cumulative;
}

function normalizeArray(inputArray) {
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
}

function cumulativeSumArray(inputArray, reverse = true) {
  const arrayToSum = reverse ? Array.from(inputArray).reverse() : inputArray;
  let currentSum = 0;
  const resultArray = arrayToSum.map((element) => (currentSum += element));
  return reverse ? resultArray.reverse() : resultArray;
}
