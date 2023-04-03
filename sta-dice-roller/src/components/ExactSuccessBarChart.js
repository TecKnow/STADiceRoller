import { Fragment, useEffect } from "react";
import { BarChart } from "chartist";
import "chartist/dist/index.css";

export default function ExactSuccessBarChart({
  attribute,
  discipline,
  focus = false,
  numDice = 2,
  normalize = true,
  complications,
  complicationsRange = 1,
  successes,
}) {
  useEffect(() => {
    const successFrequencyTable = successes.frequencyTable({
      attribute: Number(attribute),
      discipline: Number(discipline),
      focus: Boolean(focus),
      numDice: Number(numDice),
      normalize: Boolean(normalize),
    });

    const complicationsFrequencyTable = complications.frequencyTable({
      numDice: Number(numDice), 
      complicationsRange: Number(complicationsRange),
      normalize: Boolean(normalize)})
    new BarChart(
      "#barchart",
      {
        labels: Array.from(successFrequencyTable.keys()),
        series: [Array.from(successFrequencyTable.values()), Array.from(complicationsFrequencyTable.values()).map((element)=>1*element)],
      },
      {
        distributeSeries: undefined,
      }
    );
  }, [attribute, discipline, focus, numDice, successes, normalize, complications, complicationsRange]);
  return (
    <Fragment>
      <h3>Exact Successes</h3>
      <div id="barchart" style={{height: "25vh"}}></div>
    </Fragment>
  );
}
