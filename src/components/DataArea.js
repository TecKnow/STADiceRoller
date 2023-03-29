import { useState, Fragment } from "react";
import ExactSuccessBarChart from "./ExactSuccessBarChart";
import InputArea from "./InputArea";
import CumulativeSuccessLineChart from "./CumulativeSuccessLineChart";
import ExactSuccessTable from "./ExactSuccessTable";

export default function DataArea({ successes, complications }) {
  const [attribute, setAttribute] = useState("7");
  const [discipline, setDiscipline] = useState("1");
  const [focus, setFocus] = useState(false);
  const [numDice, setNumDice] = useState("2");
  const [normalize, setNormalize] = useState(true)
  const [complicationsRange, setComplicationsRange] = useState(1)

  return (
    <Fragment>
      <InputArea
        attribute={attribute}
        setAttribute={setAttribute}
        discipline={discipline}
        setDiscipline={setDiscipline}
        focus={focus}
        setFocus={setFocus}
        numDice={numDice}
        setNumDice={setNumDice}
        normalize={normalize}
        setNormalize={setNormalize}
        complicationsRange={complicationsRange}
        setComplicationsRange={setComplicationsRange}
      />
      <ExactSuccessBarChart
        attribute={attribute}
        discipline={discipline}
        focus={focus}
        numDice={numDice}
        successes={successes}
        complications={complications}
        complicationsRange={complicationsRange}
        normalize={normalize}
      />
      <ExactSuccessTable
        attribute={attribute}
        discipline={discipline}
        focus={focus}
        numDice={numDice}
        successes={successes}
        complications={complications}
        complicationsRange={complicationsRange}
        normalize={normalize}
      />
      <CumulativeSuccessLineChart
        attribute={attribute}
        discipline={discipline}
        focus={focus}
        numDice={numDice}
        successes={successes}
        complications={complications}
        complicationsRange={complicationsRange}
        normalize={normalize}
      />
    </Fragment>
  );
}
