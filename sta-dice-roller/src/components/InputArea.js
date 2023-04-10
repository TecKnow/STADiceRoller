import { Fragment } from "react";
import FlexibleNumericInput from "./DeferredNumericInput";
import styles from "../styles/InputArea.module.css"

export default function InputArea({
  attribute,
  setAttribute,
  discipline,
  setDiscipline,
  focus,
  setFocus,
  numDice,
  setNumDice,
  normalize,
  setNormalize,
  attributeMin,
  attributeMax,
  disciplineMin,
  disciplineMax,
  numDiceMin,
  numDiceMax,
  complicationsRange,
  complicationsRangeMin,
  complicationsRangeMax,
  setComplicationsRange
}) {
  return (
    <Fragment>
      <h3>Parameters</h3>
      <div className={styles.inputflex}>
      <div>
      <label>
        Attribute:{" "}
        <FlexibleNumericInput
          name="attribute"
          min={attributeMin}
          max={attributeMax}
          value={attribute}
          setValue={setAttribute}
        />
      </label></div>
      <div>
      <label>
        Discipline:{" "}
        <FlexibleNumericInput
          name="discipline"
          min={disciplineMin}
          max={disciplineMax}
          value={discipline}
          setValue={setDiscipline}
        />
      </label>
      </div>
      <div>
      <label>
        Focus:{" "}
        <input
          name="focus"
          type="checkbox"
          checked={focus}
          onChange={(e) => setFocus(e.target.checked)}
        />
      </label>
      </div>
      <div>
      <label>
        Dice:{" "}
        <FlexibleNumericInput
          name="dice"
          type="number"
          min={numDiceMin}
          max={numDiceMax}
          value={numDice}
          setValue={setNumDice}
        />
      </label></div><div>
      <label>
        Complications Range:{" "}
        <FlexibleNumericInput
          name="complications-range"
          min={complicationsRangeMin}
          max={complicationsRangeMax}
          value={complicationsRange}
          setValue={setComplicationsRange}
        />
      </label>
      </div><div>
      <label>
        normalize:{" "}
        <input
          name="normalize"
          type="checkbox"
          checked={normalize}
          onChange={(e) => setNormalize(e.target.checked)}
        />
      </label></div>
      </div>
    </Fragment>
  );
}
