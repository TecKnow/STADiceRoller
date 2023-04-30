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
      <Slider
        defaultValue={attributeMin}
        min={attributeMin}
        max={attributeMax}
        value={Number(attribute)}
        onChange={(event, newValue) => {
          setAttribute(newValue);
        }}
        marks
        valueLabelDisplay="auto"
      />
      <Slider
        defaultValue={disciplineMin}
        min={disciplineMin}
        max={disciplineMax}
        value={Number(discipline)}
        onChange={(event, newValue) => {
          setDiscipline(newValue);
        }}
        marks
        valueLabelDisplay="auto"
      />
      <FormControlLabel
        control={<Switch />}
        label="Focus"
        checked={focus}
        onChange={(e) => setFocus(e.target.checked)}
      />
      <Slider
        defaultValue={Number(numDice)}
        min={Number(numDiceMin)}
        max={Number(numDiceMax)}
        value={Number(numDice)}
        onChange={(event, newValue) => {
          setNumDice(newValue);
        }}
        marks
        valueLabelDisplay="auto"
      />
      <Slider
        defaultValue={Number(complicationsRange)}
        min={Number(complicationsRangeMin)}
        max={Number(complicationsRangeMax)}
        value={Number(complicationsRange)}
        onChange={(event, newValue) => {
          setComplicationsRange(newValue);
        }}
        marks
        valueLabelDisplay="auto"
      />
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
