import { Fragment } from "react";
import {
  Switch,
  FormControlLabel,
  Slider,
  Grid,
  Typography,
  IconButton
} from "@mui/material";

import { AddCircle, RemoveCircle } from "@mui/icons-material";

export function RollInputBar({
  attribute,
  setAttribute,
  discipline,
  setDiscipline,
  focus,
  setFocus,
  attributeMin,
  attributeMax,
  disciplineMin,
  disciplineMax,
}) {
  return (
    <Fragment>
      <Grid item xs={3}>
        <Slider
          defaultValue={attributeMin}
          min={attributeMin}
          max={attributeMax}
          value={Number(attribute)}
          onChange={(event, newValue) => {
            setAttribute(Number(newValue));
          }}
          marks
          valueLabelDisplay="on"
          aria-labelledby="attribute-slider"
        />
      </Grid>
      <Grid item xs={1}>
        <Typography id="attribute-slider">Attribute</Typography>
      </Grid>
      <Grid item xs={3}>
        <Slider
          defaultValue={Number(disciplineMin)}
          min={Number(disciplineMin)}
          max={Number(disciplineMax)}
          value={Number(discipline)}
          onChange={(event, newValue) => {
            setDiscipline(Number(newValue));
          }}
          marks
          valueLabelDisplay="on"
          aria-labelledby="discipline-slider"
        />
      </Grid>
      <Grid item xs={1}>
        <Typography id="discipline-slider">Discipline</Typography>
      </Grid>
      <Grid item xs={4} sm={8} md={4}>
        <FormControlLabel
          control={<Switch />}
          label="Focus"
          checked={focus}
          onChange={(e) => setFocus(e.target.checked)}
        />
      </Grid>
    </Fragment>
  );
}

export function AssistantArea(){};

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
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={8} md={12}>
          <Typography variant="h3" gutterBottom>
            Parameters
          </Typography>
        </Grid>
        <Grid item xs={4} sm={8} md={12}>
          <Typography variant="h4" gutterBottom>
            Leader
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Slider
            defaultValue={Number(2)}
            min={Number(numDiceMin)}
            max={Number(numDiceMax)}
            value={Number(numDice)}
            onChange={(event, newValue) => {
              setNumDice(Number(newValue));
            }}
            marks
            valueLabelDisplay="on"
            aria-labelledby="num-dice-slider"
          />
        </Grid>
        <Grid item xs={1}>
          <Typography id="num-dice-slider">Dice</Typography>
        </Grid>
        <Grid item xs={3}>
          <Slider
            defaultValue={Number(complicationsRangeMin)}
            min={Number(complicationsRangeMin)}
            max={Number(complicationsRangeMax)}
            value={Number(complicationsRange)}
            onChange={(event, newValue) => {
              setComplicationsRange(Number(newValue));
            }}
            marks
            valueLabelDisplay="on"
          />
        </Grid>
        <Grid item xs={1}>
          <Typography id="complications-range-slider">Complications</Typography>
        </Grid>
        <Grid item xs={4} sm={8} md={4}>
          <FormControlLabel
            control={
              <Switch
                checked={normalize}
                onChange={(e) => setNormalize(e.target.checked)}
              />
            }
            label="normalize"
          />
        </Grid>
        <RollInputBar
          attribute={attribute}
          setAttribute={setAttribute}
          discipline={discipline}
          setDiscipline={setDiscipline}
          focus={focus}
          setFocus={setFocus}
          attributeMin={attributeMin}
          attributeMax={attributeMax}
          disciplineMin={disciplineMin}
          disciplineMax={disciplineMax}
        />

        {/* xs={2} sm={6} md={10} */}
        <Grid item xs="auto">
          <Typography variant="h4" gutterBottom>
            Assistants
          </Typography>

        </Grid>
        <Grid item xs="auto"><IconButton><AddCircle/></IconButton></Grid>
        <Grid item xs="auto"><IconButton disabled={true}><RemoveCircle/></IconButton></Grid>
      </Grid>
    </Fragment>
  );
}
