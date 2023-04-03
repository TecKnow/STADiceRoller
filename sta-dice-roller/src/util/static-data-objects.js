export function createSuccessesObject(successesJSONObj) {
  const _castArguments = ({
    numDice,
    focus,
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
    atLeast: Boolean(atLeast)
  });

  const frequencyTable = ({
    numDice = 2,
    focus = false,
    attribute,
    discipline,
    normalize = false,
  }) => {
    ({ numDice, focus, attribute, discipline } = _castArguments({
      numDice,
      focus,
      attribute,
      discipline,
      normalize,
    }));
    const freqs = focus
      ? successesJSONObj[numDice][focus][attribute][discipline]
      : successesJSONObj[numDice][focus][attribute + discipline];
    return normalize ? normalizeArray(freqs) : freqs;
  };

  const cumulativeTable = ({ numDice, focus, attribute, discipline, normalize=true, atLeast = true }) => {
    ({ numDice, focus, attribute, discipline } = _castArguments({
      numDice,
      focus,
      attribute,
      discipline,
      normalize,
      atLeast
    }));
    const freqs = frequencyTable({
      numDice,
      focus,
      attribute,
      discipline,
      normalize,
    });
    const cumFreqs = cumulativeSumArray(freqs, atLeast);
    return cumFreqs;
  };
  return { frequencyTable, cumulativeTable };
}

export function createComplicationsObject(complicationsJSONObj) {
  const _castArguments = ({
    numDice = 2,
    complicationsRange = 1,
    normalize = false,
    atLeast = false,
  }) => ({
    numDice: Number(numDice),
    complicationsRange: Number(complicationsRange),
    normalize: Boolean(normalize),
    atLeast: Boolean(atLeast),
  });

  const frequencyTable = ({
    numDice = 2,
    complicationsRange = 1,
    normalize = false,
  }) => {
    ({ numDice, complicationsRange, normalize } = _castArguments({
      numDice,
      complicationsRange,
      normalize,
    }));
    const freqs = complicationsJSONObj[numDice][complicationsRange];
    return normalize ? normalizeArray(freqs) : freqs;
  };

  const cumulativeTable = ({
    numDice = 2,
    complicationsRange = 1,
    normalize = false,
    atLeast = false,
  }) => {
    ({ numDice, complicationsRange, normalize } = _castArguments({
      numDice,
      complicationsRange,
      normalize,
      atLeast
    }));
    const freqs = frequencyTable({ numDice, complicationsRange, normalize });
    const cumulativeFreqs = cumulativeSumArray(freqs, atLeast);
    return cumulativeFreqs;
  };

  return {frequencyTable, cumulativeTable}
}

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

export const cumulativeSumArray = (inputArray, reverse = true) => {
  const arrayToSum = reverse? Array.from(inputArray).reverse() : inputArray;
  let currentSum = 0;
  const resultArray = arrayToSum.map(
    (element) => (currentSum += element)
  );
  return reverse? resultArray.reverse() : resultArray;
};
