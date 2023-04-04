import { calculateDicePoolFrequencyTable } from "../combinatorics";

describe("Tests with smaller die", () => {
  const d4 = [0, 1, 1, 1, 1];
  test("A pool of 1 die is equal to that die", ()=>{
    const res = calculateDicePoolFrequencyTable(d4);
    expect(res).toEqual(d4);
  });
  test("A pool of 2d4", ()=>{
    const res = calculateDicePoolFrequencyTable(d4,d4);
    expect(res).toEqual([0, 0, 1, 2, 3, 4, 3, 2, 1]);
  });
  test("A pool of 3d4", ()=>{
    const res = calculateDicePoolFrequencyTable(d4, d4, d4);
    expect(res).toEqual([0, 0, 0, 1, 3, 6, 10, 12, 12, 10, 6, 3, 1]);
  });
  test("1d4+2d4=3d4", ()=>{
    const threeD4 = calculateDicePoolFrequencyTable(d4,d4,d4);
    const twoD4 = calculateDicePoolFrequencyTable(d4, d4);
    const summed3d4 = calculateDicePoolFrequencyTable(twoD4, d4);
    const reverseOrderSummed3d4 = calculateDicePoolFrequencyTable(d4, twoD4)
    expect(summed3d4).toEqual(threeD4);
    expect(reverseOrderSummed3d4).toEqual(threeD4);
  });
});
