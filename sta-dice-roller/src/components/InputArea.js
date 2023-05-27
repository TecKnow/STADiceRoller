import {
  FormControlLabel,
  Unstable_Grid2 as Grid,
  IconButton,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

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
      <Grid xs={3}>
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
      <Grid xs={1}>
        <Typography id="attribute-slider">Attribute</Typography>
      </Grid>
      <Grid xs={3}>
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
      <Grid xs={1}>
        <Typography id="discipline-slider">Discipline</Typography>
      </Grid>
      <Grid xs={4} sm={8} md={4}>
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

export function AssistantArea({
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
  assistList,
  setAssistList,
}) {
  return (
    <Fragment>
      <Stack direction="row" spacing={{ xs: 2, md: 3 }}>
        <Typography variant="h4" gutterBottom>
          Assistants
        </Typography>
        <IconButton
          aria-label="add assistant"
          onClick={() => {
            setAssistList([
              ...assistList,
              [attributeMin, disciplineMin, false],
            ]);
          }}
        >
          <AddCircle />
        </IconButton>
        <IconButton
          disabled={assistList.length == 0}
          aria-label="remove assistant"
          onClick={() => {
            setAssistList(assistList.slice(0, -1));
          }}
        >
          <RemoveCircle />
        </IconButton>
      </Stack>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid xs={1}></Grid>
        <Grid xs={1}></Grid>
        <Grid xs={1} sm={5} md={9}></Grid>
        <AssistRollRows
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
          assistList={assistList}
          setAssistList={setAssistList}
        />
      </Grid>
    </Fragment>
  );
}

export function AssistRollRows({
  attributeMin,
  attributeMax,
  disciplineMin,
  disciplineMax,
  assistList,
  setAssistList,
}) {
  if (assistList.length == 0) {
    return <Grid xs={4} sm={8} md={12}></Grid>;
  }
  return assistList.map(([attribute, discipline, focus], idx) => (
    <RollInputBar
      key={idx}
      attribute={attribute}
      discipline={discipline}
      focus={focus}
      attributeMin={attributeMin}
      attributeMax={attributeMax}
      disciplineMin={disciplineMin}
      disciplineMax={disciplineMax}
      setAttribute={(newValue) => {
        const newAssistList = [...assistList];
        newAssistList[idx][0] = Number(newValue);
        setAssistList(newAssistList);
      }}
      setDiscipline={(newValue) => {
        const newAssistList = [...assistList];
        newAssistList[idx][1] = Number(newValue);
        setAssistList(newAssistList);
      }}
      setFocus={(checked) => {
        const newAssistList = [...assistList];
        newAssistList[idx][2] = Boolean(checked);
        setAssistList(newAssistList);
      }}
    />
  ));
}

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
  assistList,
  setAssistList,
}) {
  return (
    <Fragment>
      <Typography variant="h3" gutterBottom>
        Parameters
      </Typography>
      <Typography variant="h4" gutterBottom>
        Leader
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid xs={3}>
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
        <Grid xs={1}>
          <Typography id="num-dice-slider">Dice</Typography>
        </Grid>
        <Grid xs={3}>
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
        <Grid xs={1}>
          <Typography id="complications-range-slider">Complications</Typography>
        </Grid>
        <Grid xs={4} sm={8} md={4}>
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
      </Grid>
      <AssistantArea
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
        assistList={assistList}
        setAssistList={setAssistList}
      />
    </Fragment>
  );
}
