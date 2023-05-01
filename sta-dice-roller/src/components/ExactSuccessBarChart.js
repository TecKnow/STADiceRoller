import { Fragment, useEffect } from "react";
import { Typography } from "@mui/material";
import { BarChart } from "chartist";
import "chartist/dist/index.css";

import { successesFrequencyTable, complicationsFrequencyTable } from "@/util/combinatorics";

export default function ExactSuccessBarChart({
  attribute,
  discipline,
  focus = false,
  numDice = 2,
  normalize = true,
  complicationsRange = 1,
}) {
  useEffect(() => {
    const exactSuccesses = successesFrequencyTable({
      attribute: Number(attribute),
      discipline: Number(discipline),
      focus: Boolean(focus),
      numDice: Number(numDice),
      normalize: Boolean(normalize),
    });

    const exactComplications = complicationsFrequencyTable({
      numDice: Number(numDice), 
      complicationsRange: Number(complicationsRange),
      normalize: Boolean(normalize)})
    new BarChart(
      "#barchart",
      {
        labels: Array.from(exactSuccesses.keys()),
        series: [Array.from(exactSuccesses.values()), Array.from(exactComplications.values()).map((element)=>1*element)],
      },
      {
        distributeSeries: undefined,
      }
    );
  }, [attribute, discipline, focus, numDice, normalize, complicationsRange]);
  return (
    <Fragment>
      <Typography variant="h3" gutterBottom>Exact Successes</Typography>
      <div id="barchart" style={{height: "25vh"}}></div>
    </Fragment>
  );
}
