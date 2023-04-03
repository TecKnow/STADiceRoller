import { Fragment, useEffect } from "react";
import { LineChart } from "chartist";
import "chartist/dist/index.css";

export default function CumulativeSuccessLineChart({
  attribute,
  discipline,
  focus = false,
  numDice = 2,
  successes,
  complications,
  normalize = true,
  complicationsRange = 1,
}) {
  useEffect(() => {
    const cumulativeSuccessTable = successes.cumulativeTable({
      attribute: Number(attribute),
      discipline: Number(discipline),
      focus: Boolean(focus),
      numDice: Number(numDice),
      normalize: Boolean(normalize),
    });
    
    const cumulativeComplicationsTable = complications.cumulativeTable({
      numDice: Number(numDice), 
      complicationsRange: Number(complicationsRange),
      normalize: Boolean(normalize)})

    
    new LineChart(
      "#linechart",
      {
        labels: Array.from(cumulativeSuccessTable.keys()),
        series: [
          Array.from(cumulativeSuccessTable.values()), 
          Array.from(cumulativeComplicationsTable.values()).map((element) =>1 * element)]
      },
    );
  }, [
    attribute,
    discipline,
    focus,
    numDice,
    successes,
    complications,
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
