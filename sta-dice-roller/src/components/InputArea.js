import { Fragment } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
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
  setComplicationsRange,
}) {
  return (
    <Fragment>
      <h3>Parameters</h3>
      <label>
        Attribute
      <Slider
        defaultValue={attributeMin}
        min={attributeMin}
        max={attributeMax}
        value={Number(attribute)}
        onChange={(event, newValue) => {
          setAttribute(Number(newValue));
        }}
        marks
        valueLabelDisplay="auto"
      /></label>
      <label>Discipline
      <Slider
        defaultValue={Number(disciplineMin)}
        min={Number(disciplineMin)}
        max={Number(disciplineMax)}
        value={Number(discipline)}
        onChange={(event, newValue) => {
          setDiscipline(Number(newValue));
        }}
        marks
        valueLabelDisplay="auto"
      />
      </label>
      <FormControlLabel
        control={<Switch />}
        label="Focus"
        checked={focus}
        onChange={(e) => setFocus(e.target.checked)}
      />
      <label>
        Dice
      <Slider
        defaultValue={Number(2)}
        min={Number(numDiceMin)}
        max={Number(numDiceMax)}
        value={Number(numDice)}
        onChange={(event, newValue) => {
          setNumDice(Number(newValue));
        }}
        marks
        valueLabelDisplay="auto"
      />
      </label>
      <label>Complications Range
      <Slider
        defaultValue={Number(complicationsRangeMin)}
        min={Number(complicationsRangeMin)}
        max={Number(complicationsRangeMax)}
        value={Number(complicationsRange)}
        onChange={(event, newValue) => {
          setComplicationsRange(Number(newValue));
        }}
        marks
        valueLabelDisplay="auto"
      />
      </label>
      <FormControlLabel
        control={
          <Switch
            checked={normalize}
            onChange={(e) => setNormalize(e.target.checked)}
          />
        }
        label="normalize"
      />
    </Fragment>
  );
}
