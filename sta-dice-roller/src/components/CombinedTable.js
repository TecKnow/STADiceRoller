import {
  complicationsCumulativeTable,
  complicationsFrequencyTable,
  successesCumulativeTable,
  successesFrequencyTable,
} from "@/util/combinatorics";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function CombinedTable({
  attribute,
  discipline,
  focus = false,
  numDice = 2,
  complicationsRange,
  normalize = true,
  assistList,
}) {
  const exactSuccessList = successesFrequencyTable(
    {
      attribute,
      discipline,
      focus,
      numDice,
      normalize,
    },
    assistList
  );

  const exactComplicationsList = complicationsFrequencyTable({
    numDice: Number(numDice) + Number(assistList.length),
    complicationsRange,
    normalize,
  });

  const cumulativeSuccessList = successesCumulativeTable(
    { attribute, discipline, focus, numDice, normalize },
    assistList
  );

  const cumulativeComplicationsList = complicationsCumulativeTable({
    numDice: Number(numDice) + Number(assistList.length),
    complicationsRange,
    normalize,
  });

  const zipLists = Array.prototype.map.call(
    exactSuccessList,
    (exactSuccesses, idx) => {
      const exactComplications =
        idx < exactComplicationsList.length ? exactComplicationsList[idx] : 0;
      const cumulativeSuccesses = cumulativeSuccessList[idx];
      const cumulativeComplications =
        idx < cumulativeComplicationsList.length
          ? cumulativeComplicationsList[idx]
          : cumulativeComplicationsList[cumulativeComplicationsList.length - 1];
      return [
        exactSuccesses,
        cumulativeSuccesses,
        exactComplications,
        cumulativeComplications,
      ];
    }
  );

  const rows = Array.prototype.map.call(
    zipLists,
    (
      [
        exactSuccesses,
        cumulativeSuccesses,
        exactComplications,
        cumulativeComplications,
      ],
      idx
    ) => (
      <TableRow key={`${idx}_${exactSuccesses}_${exactComplications}`}>
        <TableCell>{idx}</TableCell>
        <TableCell>
          {normalize
            ? Number(exactSuccesses).toLocaleString(undefined, {
                style: "percent",
                maximumFractionDigits: 5,
              })
            : Number(exactSuccesses).toLocaleString()}
        </TableCell>
        <TableCell>
          {normalize
            ? Number(cumulativeSuccesses).toLocaleString(undefined, {
                style: "percent",
                maximumFractionDigits: 5,
              })
            : Number(cumulativeSuccesses).toLocaleString(undefined)}
        </TableCell>
        <TableCell>
          {normalize
            ? Number(exactComplications).toLocaleString(undefined, {
                style: "percent",
                maximumFractionDigits: 5,
              })
            : Number(exactComplications).toLocaleString()}
        </TableCell>
        <TableCell>
          {normalize
            ? Number(cumulativeComplications).toLocaleString(undefined, {
                style: "percent",
                maximumFractionDigits: 5,
              })
            : Number(cumulativeComplications).toLocaleString(undefined)}
        </TableCell>
      </TableRow>
    )
  );

  return (
    <TableContainer>
      <Table size="small">
        <caption>Frequency Table</caption>
        <TableHead>
          <TableRow>
            <TableCell>Count</TableCell>
            <TableCell>Successes</TableCell>
            <TableCell>&ge;&nbsp;Successes</TableCell>
            <TableCell>Complications</TableCell>
            <TableCell>&le;&nbsp;Complications</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
}
