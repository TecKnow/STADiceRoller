import { Fragment, useEffect } from "react";
import { BarChart } from "chartist";
import "chartist/dist/index.css";

export default function ExactSuccessBarChart({
  attribute,
  discipline,
  focus = false,
  numDice = 2,
  normalize = true,
  successes,
}) {
  useEffect(() => {
    const frequencyTable = successes.frequencyTable({
      attribute: Number(attribute),
      discipline: Number(discipline),
      focus: Boolean(focus),
      numDice: Number(numDice),
      normalize: Boolean(normalize),
    });
    new BarChart(
      "#chart",
      {
        labels: Array.from(frequencyTable.keys()),
        series: Array.from(frequencyTable.values()),
      },
      {
        distributeSeries: true,
      }
    );
  }, [attribute, discipline, focus, numDice, successes, normalize]);
  return (
    <Fragment>
      <h3>Exact Successes</h3>
      <div id="chart"></div>
    </Fragment>
  );
}
