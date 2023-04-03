import { useState, Fragment } from "react";
import ExactSuccessBarChart from "./ExactSuccessBarChart";
import InputArea from "./InputArea";
import CumulativeSuccessLineChart from "./CumulativeSuccessLineChart";
import ExactSuccessTable from "./ExactSuccessTable";
import CumulativeSuccessTable from "./CumulativeSuccessTable";
import CombinedTable from "./CombinedTable";

export default function DataArea({ successes, complications }) {
  const [attribute, setAttribute] = useState("7");
  const [discipline, setDiscipline] = useState("1");
  const [focus, setFocus] = useState(false);
  const [numDice, setNumDice] = useState("2");
  const [normalize, setNormalize] = useState(true);
  const [complicationsRange, setComplicationsRange] = useState(1);

  return (
    <Fragment>
      <InputArea
        attribute={attribute}
        setAttribute={setAttribute}
        attributeMin={7}
        attributeMax={12}
        discipline={discipline}
        setDiscipline={setDiscipline}
        disciplineMin={1}
        disciplineMax={5}
        focus={focus}
        setFocus={setFocus}
        numDice={numDice}
        numDiceMin={1}
        numDiceMax={5}
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
      <CombinedTable
              attribute={attribute}
              discipline={discipline}
              focus={focus}
              numDice={numDice}
              successes={successes}
              complications={complications}
              complicationsRange={complicationsRange}
              normalize={normalize}/>
    </Fragment>
  );
}
