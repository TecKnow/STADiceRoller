import { Typography } from "@mui/material";
import { LineChart } from "chartist";
import "chartist/dist/index.css";
import { Fragment, useEffect } from "react";

import {
  complicationsCumulativeTable,
  successesCumulativeTable,
} from "@/util/combinatorics";

export default function CumulativeSuccessLineChart({
  attribute,
  discipline,
  focus = false,
  numDice = 2,
  normalize = true,
  complicationsRange = 1,
  assistList,
}) {
  useEffect(() => {
    const cumulativeSuccesses = successesCumulativeTable(
      {
        attribute: Number(attribute),
        discipline: Number(discipline),
        focus: Boolean(focus),
        numDice: Number(numDice),
        normalize: Boolean(normalize),
      },
      assistList
    );

    const cumulativeComplications = complicationsCumulativeTable({
      numDice: Number(numDice) + assistList.length,
      complicationsRange: Number(complicationsRange),
      normalize: Boolean(normalize),
    });

    new LineChart("#linechart", {
      labels: Array.from(cumulativeSuccesses.keys()),
      series: [
        Array.from(cumulativeSuccesses.values()),
        Array.from(cumulativeComplications.values()).map(
          (element) => 1 * element
        ),
      ],
    });
  }, [
    attribute,
    discipline,
    focus,
    numDice,
    normalize,
    complicationsRange,
    assistList,
  ]);
  return (
    <Fragment>
      <Typography variant="h3" gutterBottom>
        Cumulative Probability
      </Typography>
      <div id="linechart" style={{ height: "25vh" }}></div>
    </Fragment>
  );
}
