import { Fragment, useEffect } from "react";
import { LineChart } from "chartist";
import "chartist/dist/index.css";


export default function CumulativeSuccessLineChart({ attribute, discipline, focus=false, numDice = 2, successes, normalize=true}) {
    useEffect(() => {
      const cumulativeTable = successes.cumulativeTable(
        {attribute: Number(attribute),
        discipline: Number(discipline),
        focus: Boolean(focus),
        numDice: Number(numDice),
      normalize: Boolean(normalize)}
      );
      new LineChart(
        "#linechart",
        {
          labels: Array.from(cumulativeTable.keys()),
          series: [Array.from(cumulativeTable.values())],
        },
        {}
      );
    }, [attribute, discipline, focus, numDice, successes, normalize]);
    return (
      <Fragment>
        <h3>Cumulative Probability</h3>
        <div id="linechart"></div>
      </Fragment>
    );
  }