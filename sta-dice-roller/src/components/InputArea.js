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
}) {
  return (
    <Fragment>
      <h3>Parameters</h3>
      <label>
        Attribute:{" "}
        <input
          name="attribute"
          type="number"
          min="7"
          max="12"
          value={attribute}
          onChange={(e) => setAttribute(e.target.value)}
        />
      </label>
      <label>
        Discipline:{" "}
        <input
          name="discipline"
          type="number"
          min="1"
          max="5"
          value={discipline}
          onChange={(e) => setDiscipline(e.target.value)}
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
          min="2"
          max="5"
          value={numDice}
          onChange={(e) => setNumDice(e.target.value)}
        />
      </label>
    </Fragment>
  );
}
