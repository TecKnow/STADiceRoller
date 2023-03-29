import { Fragment } from "react";

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
}) {
  return (
    <Fragment>
      <h3>Parameters</h3>
      <label>
        Attribute:{" "}
        <input
          name="attribute"
          type="number"
          min={attributeMin}
          max={attributeMax}
          value={attribute}
          onChange={(e) => {
            const newNumber = Number(e.target.value);
            if (
              newNumber >= Number(attributeMin) &&
              newNumber <= Number(attributeMax)
            ) {
              return setAttribute(newNumber);
            }
          }}
        />
      </label>
      <label>
        Discipline:{" "}
        <input
          name="discipline"
          type="number"
          min={disciplineMin}
          max={disciplineMax}
          value={discipline}
          onChange={(e) => {
            const newNumber = Number(e.target.value);
            if (
              newNumber >= Number(disciplineMin) &&
              newNumber <= Number(disciplineMax)
            ) {
              return setDiscipline(newNumber);
            }
          }}
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
        <input
          name="dice"
          type="number"
          min={numDiceMin}
          max={numDiceMax}
          value={numDice}
          onChange={(e) => {
            const newNumber = Number(e.target.value);
            if (
              newNumber >= Number(numDiceMin) &&
              newNumber <= Number(numDiceMax)
            ) {
              return setNumDice(newNumber);
            }
          }}
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
