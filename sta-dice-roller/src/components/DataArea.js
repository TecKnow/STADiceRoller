import { useState, Fragment } from "react";
import ExactSuccessBarChart from "./ExactSuccessBarChart";
import InputArea from "./InputArea";
import CumulativeSuccessLineChart from "./CumulativeSuccessLineChart";
import CombinedTable from "./CombinedTable";

export default function DataArea() {
  const [attribute, setAttribute] = useState("7");
  const [discipline, setDiscipline] = useState("1");
  const [focus, setFocus] = useState(false);
  const [numDice, setNumDice] = useState("2");
  const [normalize, setNormalize] = useState(true);
  const [complicationsRange, setComplicationsRange] = useState(1);
  const [assistList, setAssistList] = useState([]);

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
        complicationsRangeMin={1}
        complicationsRangeMax={5}
        assistList={assistList}
        setAssistList={setAssistList}
      />
      <ExactSuccessBarChart
        attribute={attribute}
        discipline={discipline}
        focus={focus}
        numDice={numDice}
        complicationsRange={complicationsRange}
        normalize={normalize}
      />
      <CumulativeSuccessLineChart
        attribute={attribute}
        discipline={discipline}
        focus={focus}
        numDice={numDice}
        complicationsRange={complicationsRange}
        normalize={normalize}
      />
      <CombinedTable
              attribute={attribute}
              discipline={discipline}
              focus={focus}
              numDice={numDice}
              complicationsRange={complicationsRange}
              normalize={normalize}/>
    </Fragment>
  );
}
