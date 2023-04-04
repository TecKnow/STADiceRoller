export function calculateDicePoolFrequencyTable(...dice) {
  dice = Array.prototype.map.call(dice, (die) => Array.from(die));
  const results = Array.prototype.reduce.call(dice, (accumulator, die) => {
    accumulator = Array.from(accumulator);
    die = Array.from(die);
    const nextArray = Array((accumulator.length-1) + (die.length-1) + 1).fill(0);
    Array.prototype.forEach.call(die, (dieCount, dieIdx) =>
      Array.prototype.forEach.call(
        accumulator,
        (accumulatorCount, accumulatorIdx) => {
          const resultIdx = dieIdx + accumulatorIdx;
          const countIncrement = dieCount * accumulatorCount;
          nextArray[resultIdx] += countIncrement;
        }
      )
    );
    return nextArray;
  });
  return results;
}
