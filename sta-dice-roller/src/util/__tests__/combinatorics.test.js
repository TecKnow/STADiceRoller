import {
  calculateDicePoolFrequencyTable,
  successesFrequencyTable,
  complicationsFrequencyTable,
} from "../combinatorics";
import loadStaticDataFromFile, {
  flattenSucessesJSONObj,
  flattenComplicationsJSONObj,
} from "../static-data-test-objects";

describe("Test general dice pool function", () => {
  describe("Tests with smaller die", () => {
    const d4 = [0, 1, 1, 1, 1];
    test("A pool of 1 die is equal to that die", () => {
      const res = calculateDicePoolFrequencyTable(d4);
      expect(res).toEqual(d4);
    });
    test("A pool of 2d4", () => {
      const res = calculateDicePoolFrequencyTable(d4, d4);
      expect(res).toEqual([0, 0, 1, 2, 3, 4, 3, 2, 1]);
    });
    test("A pool of 3d4", () => {
      const res = calculateDicePoolFrequencyTable(d4, d4, d4);
      expect(res).toEqual([0, 0, 0, 1, 3, 6, 10, 12, 12, 10, 6, 3, 1]);
    });
    test("1d4+2d4=3d4", () => {
      const threeD4 = calculateDicePoolFrequencyTable(d4, d4, d4);
      const twoD4 = calculateDicePoolFrequencyTable(d4, d4);
      const summed3d4 = calculateDicePoolFrequencyTable(twoD4, d4);
      const reverseOrderSummed3d4 = calculateDicePoolFrequencyTable(d4, twoD4);
      expect(summed3d4).toEqual(threeD4);
      expect(reverseOrderSummed3d4).toEqual(threeD4);
    });
    test("8-12 table, to show dice don't have to be identical", () => {
      /**
       * This is a random encounter table format from D&D
       * Apparently frist used in the Monster Manual II and present in the fifth
       * edition DMG in Chapter 3: Creating Adventures.
       *
       * It creates a more uniform space for "common" encounters than combining
       * two of the same dice could provide.  All rolls (sum of both dice)
       * between 9 and 13 are equally likely.
       */
      const d8 = [0, ...Array(8).fill(1)];
      const d12 = [0, ...Array(12).fill(1)];
      const res = calculateDicePoolFrequencyTable(d8, d12);
      expect(res).toEqual([
        0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 8, 8, 7, 6, 5, 4, 3, 2, 1,
      ]);
    });
  });
});

describe("Test dice pool with assists", () => {
  test("The worst realistic case", () => {
    const res = successesFrequencyTable(
      {
        numDice: 2,
        focus: false,
        discipline: 1,
        attribute: 7,
        normalize: false,
      },
      [{ attribute: 7, discipline: 1, focus: false }]
    );
    expect(res).toEqual([2880, 2016, 2052, 847, 183, 21, 1]);
  });
  test("Two perfect characters without momentum", () => {
    const res = successesFrequencyTable(
      {
        numDice: 2,
        focus: true,
        discipline: 5,
        attribute: 12,
        normalize: false,
      },
      [{ attribute: 12, discipline: 5, focus: true }]
    );
    expect(res).toEqual([180, 216, 1386, 2808, 2385, 900, 125]);
  });
  test("Two perfect characters with 6 momentum", () => {
    const res = successesFrequencyTable(
      {
        numDice: 5,
        focus: true,
        discipline: 5,
        attribute: 12,
        normalize: false,
      },
      [{ attribute: 12, discipline: 5, focus: true }]
    );
    expect(res).toEqual([
      4860, 14580, 181035, 1078920, 3996135, 9630576, 15300684, 16050960,
      11100375, 4995000, 1406250, 225000, 15625,
    ]);
  });
  test("Great team, terrible boss", () => {
    const res = successesFrequencyTable(
      {
        numDice: 2,
        focus: true,
        discipline: 1,
        attribute: 7,
        normalize: false,
      },
      [
        { attribute: 12, discipline: 5, focus: true },
        { attribute: 12, discipline: 5, focus: true },
        { attribute: 12, discipline: 5, focus: true },
      ]
    );
    expect(res).toEqual([
      1152000, 4536, 56403, 264438, 580770, 626022, 366048, 122898, 24110, 2650,
      125,
    ]);
  });
});

describe("Test STA dice pool calculator", () => {
  describe("Success base cases", () => {
    test("One die, no focus, frequency", () => {
      const res = successesFrequencyTable({
        numDice: 1,
        focus: false,
        attribute: 7,
        discipline: 2,
        normalize: false,
      });
      expect(res).toEqual([11, 8, 1]);
    });
    test("One die, focus, frequency", () => {
      const res = successesFrequencyTable({
        numDice: 1,
        focus: true,
        attribute: 7,
        discipline: 2,
        normalize: false,
      });
      expect(res).toEqual([11, 7, 2]);
    });
    test("Two dice, no focus, frequency", () => {
      const res = successesFrequencyTable({
        numDice: 2,
        focus: false,
        attribute: 7,
        discipline: 2,
        normalize: false,
      });
      expect(res).toEqual([121, 176, 86, 16, 1]);
    });
    test("Two dice, focus, frequency", () => {
      const res = successesFrequencyTable({
        numDice: 2,
        focus: true,
        attribute: 7,
        discipline: 2,
        normalize: false,
      });
      expect(res).toEqual([121, 154, 93, 28, 4]);
    });
  });
  describe("Complications base cases", () => {
    test("One die, range 1", () => {
      const res = complicationsFrequencyTable({
        numDice: 1,
        complicationsRange: 1,
        normalize: false,
      });
      expect(res).toEqual([19, 1]);
    });
    test("Two dice, range 1", () => {
      const res = complicationsFrequencyTable({
        numDice: 2,
        complicationsRange: 1,
        normalize: false,
      });
      expect(res).toEqual([361, 38, 1]);
    });
    test("One die, range 2", () => {
      const res = complicationsFrequencyTable({
        numDice: 1,
        complicationsRange: 2,
        normalize: false,
      });
      expect(res).toEqual([18, 2]);
    });
    test("Two dice, range 2", () => {
      const res = complicationsFrequencyTable({
        numDice: 2,
        complicationsRange: 2,
        normalize: false,
      });
      expect(res).toEqual([324, 72, 4]);
    });
  });
  describe("Test against static data generated by enumeration", () => {
    const { successesJSONObj, complicationsJSONObj } = loadStaticDataFromFile();
    describe("Test against success data", () => {
      const successTestArgs = flattenSucessesJSONObj(successesJSONObj);
      const successFocusTestArgs = successTestArgs.filter((v) => v[1]);
      const successNoFocusTestArgs = successTestArgs.filter((v) => !v[1]);
      describe("With focus", () => {
        test.each(successFocusTestArgs)(
          "Dice: %i, Focus: %o, Attribute: %i, Discipline: %i",
          (numDice, focus, attribute, discipline, ref) => {
            const res = successesFrequencyTable({
              numDice,
              focus,
              discipline,
              attribute,
              normalize: false,
            });
            expect(res).toEqual(ref);
          }
        );
      });
      describe("Without focus", () => {
        test.each(successNoFocusTestArgs)(
          "Dice: %i, Focus: %o, Target: %i",
          (numDice, focus, targetNumber, ref) => {
            const res = successesFrequencyTable({
              numDice,
              focus,
              discipline: 0,
              attribute: targetNumber,
              normalize: false,
            });
            expect(res).toEqual(ref);
          }
        );
      });
    });
    describe("Test against complications data", () => {
      const complicationsTestArgs =
        flattenComplicationsJSONObj(complicationsJSONObj);
      test.each(complicationsTestArgs)(
        "Dice: %i, Range: %i",
        (numDice, complicationsRange, ref) => {
          const res = complicationsFrequencyTable({
            numDice,
            complicationsRange,
          });
          expect(res).toEqual(ref);
        }
      );
    });
  });
});
