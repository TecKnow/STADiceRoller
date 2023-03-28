import { Fragment, useEffect } from "react";
import { BarChart } from "chartist";
import "chartist/dist/index.css";

import { getSuccessFrequencyTable } from "@/stats";


export default function PoolSuccessBarChart({ attribute, discipline, focus, numDice = 2 }) {
    useEffect(() => {
      const frequencyTable = getSuccessFrequencyTable(
        Number(attribute),
        Number(discipline),
        Boolean(focus),
        Number(numDice)
      );
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
    }, [attribute, discipline, focus, numDice]);
    return (
      <Fragment>
        <div id="chart"></div>
      </Fragment>
    );
  }