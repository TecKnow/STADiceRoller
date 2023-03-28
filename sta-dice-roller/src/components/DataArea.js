import { useState, Fragment } from "react";
import PoolSuccessBarChart from "./PoolSuccessBarChart";
import InputArea from "./InputArea";

export default function DataArea({successes, complications}) {
    const [attribute, setAttribute] = useState("7");
    const [discipline, setDiscipline] = useState("1");
    const [focus, setFocus] = useState(false);
    const [numDice, setNumDice] = useState("2");
  
    return (
      <Fragment>
        <PoolSuccessBarChart
          attribute={attribute}
          discipline={discipline}
          focus={focus}
          numDice={numDice}
        />
        <InputArea 
        attribute={attribute}
        setAttribute={setAttribute}
        discipline={discipline}
        setDiscipline={setDiscipline}
        focus={focus}
        setFocus={setFocus}
        numDice={numDice}
        setNumDice={setNumDice}
        />
      </Fragment>
    );
  }