import { Fragment, useEffect } from "react";
import { LineChart } from "chartist";
import "chartist/dist/index.css";

import { normalizeArray, cumulativeSumArray } from "@/stats";


export default function CumulativeSuccessLineChart({ attribute, discipline, focus=false, numDice = 2, getSuccesses}) {
    useEffect(() => {
      const frequencyTable = getSuccesses(
        {attribute: Number(attribute),
        discipline: Number(discipline),
        focus: Boolean(focus),
        numDice: Number(numDice)}
      );
      new LineChart(
        "#linechart",
        {
          labels: Array.from(frequencyTable.keys()),
          series: [cumulativeSumArray(normalizeArray(Array.from(frequencyTable.values())))],
        },
        {
          low: 0,
          high: 1
        }
      );
    }, [attribute, discipline, focus, numDice, getSuccesses]);
    return (
      <Fragment>
        <h3>Cumulative Probability</h3>
        <div id="linechart"></div>
      </Fragment>
    );
  }