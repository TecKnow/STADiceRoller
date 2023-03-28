import { useState, Fragment } from "react";
import ExactSuccessBarChart from "./ExactSuccessBarChart";
import InputArea from "./InputArea";
import { createSuccessFunction } from "@/stats";
import CumulativeSuccessLineChart from "./CumulativeSuccessLineChart";

export default function DataArea({successes, complications}) {
    const [attribute, setAttribute] = useState("7");
    const [discipline, setDiscipline] = useState("1");
    const [focus, setFocus] = useState(false);
    const [numDice, setNumDice] = useState("2");
    
    const getSuccessTable = createSuccessFunction(successes);
  
    return (
      <Fragment>
        <ExactSuccessBarChart
          attribute={attribute}
          discipline={discipline}
          focus={focus}
          numDice={numDice}
          getSuccesses={getSuccessTable}
        />
        <CumulativeSuccessLineChart
                  attribute={attribute}
                  discipline={discipline}
                  focus={focus}
                  numDice={numDice}
                  getSuccesses={getSuccessTable}
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