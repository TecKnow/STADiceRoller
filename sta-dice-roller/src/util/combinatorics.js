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

const _castArguments = ({
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

function _crateSuccessDie({ attribute, discipline, focus = false }) {
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

export function successesFrequencyTable({
  numDice = 2,
  focus = false,
  attribute,
  discipline,
  normalize = false,
}) {
  ({ numDice, focus, attribute, discipline, normalize } = _castArguments({
    numDice,
    focus,
    attribute,
    discipline,
    normalize,
  }));
  const successDie = _crateSuccessDie({ attribute, discipline, focus });
  const dicePool = Array(numDice).fill(successDie);
  const res = calculateDicePoolFrequencyTable(...dicePool);
  while (res.at(-1) == 0) {
    res.pop();
  }
  return res;
}

export function complicationsFrequencyTable({
  numDice = 2,
  complicationsRange = 1,
  normalize=false,
}) {
  numDice = Number(numDice);
  complicationsRange = Number(complicationsRange);
  const complicationsDie = [20 - complicationsRange, complicationsRange];
  const dicePool = Array(numDice).fill(complicationsDie);
  const res = calculateDicePoolFrequencyTable(...dicePool);
  while (res.at(-1) == 0) {
    res.pop();
  }
  return res;
}
