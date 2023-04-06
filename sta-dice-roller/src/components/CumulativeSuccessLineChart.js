import { Fragment, useEffect } from "react";
import { LineChart } from "chartist";
import "chartist/dist/index.css";

import { successesCumulativeTable, complicationsCumulativeTable } from "@/util/combinatorics";

export default function CumulativeSuccessLineChart({
  attribute,
  discipline,
  focus = false,
  numDice = 2,
  normalize = true,
  complicationsRange = 1,
}) {
  useEffect(() => {
    const cumulativeSuccesses = successesCumulativeTable({
      attribute: Number(attribute),
      discipline: Number(discipline),
      focus: Boolean(focus),
      numDice: Number(numDice),
      normalize: Boolean(normalize),
    });
    
    const cumulativeComplications = complicationsCumulativeTable({
      numDice: Number(numDice), 
      complicationsRange: Number(complicationsRange),
      normalize: Boolean(normalize)})

    
    new LineChart(
      "#linechart",
      {
        labels: Array.from(cumulativeSuccesses.keys()),
        series: [
          Array.from(cumulativeSuccesses.values()), 
          Array.from(cumulativeComplications.values()).map((element) =>1 * element)]
      },
    );
  }, [
    attribute,
    discipline,
    focus,
    numDice,
    normalize,
    complicationsRange,
  ]);
  return (
    <Fragment>
      <h3>Cumulative Probability</h3>
      <div id="linechart" style={{height: "25vh"}}></div>
    </Fragment>
  );
}
