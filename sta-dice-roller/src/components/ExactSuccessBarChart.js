import { Fragment, useEffect } from "react";
import { BarChart } from "chartist";
import "chartist/dist/index.css";

import { normalizeArray } from "@/stats";


export default function ExactSuccessBarChart({ attribute, discipline, focus=false, numDice = 2, getSuccesses}) {
    useEffect(() => {
      const frequencyTable = getSuccesses(
        {attribute: Number(attribute),
        discipline: Number(discipline),
        focus: Boolean(focus),
        numDice: Number(numDice)}
      );
      new BarChart(
        "#chart",
        {
          labels: Array.from(frequencyTable.keys()),
          series: normalizeArray(Array.from(frequencyTable.values())),
        },
        {
          distributeSeries: true,
        }
      );
    }, [attribute, discipline, focus, numDice, getSuccesses]);
    return (
      <Fragment>
        <h3>Exact Successes</h3>
        <div id="chart"></div>
      </Fragment>
    );
  }