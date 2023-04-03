import { Fragment } from "react";
import FlexibleNumericInput from "./DeferredNumericInput";

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
      <label>
        Attribute:{" "}
        <FlexibleNumericInput
          name="attribute"
          min={attributeMin}
          max={attributeMax}
          value={attribute}
          setValue={setAttribute}
        />
      </label>
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
      <label>
        Focus:{" "}
        <input
          name="focus"
          type="checkbox"
          checked={focus}
          onChange={(e) => setFocus(e.target.checked)}
        />
      </label>
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
      </label>
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
      <label>
        normalize:{" "}
        <input
          name="normalize"
          type="checkbox"
          checked={normalize}
          onChange={(e) => setNormalize(e.target.checked)}
        />
      </label>
    </Fragment>
  );
}
