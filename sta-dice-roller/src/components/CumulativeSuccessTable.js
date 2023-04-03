

export default function CumulativeSuccessTable({
  attribute,
  discipline,
  focus = false,
  numDice = 2,
  successes,
  complications,
  complicationsRange,
  normalize=true
}) {
  const successList = successes.cumulativeTable({ attribute, discipline, focus, numDice, normalize});
  
  const complicationsList = complications.cumulativeTable({
    numDice,
    complicationsRange,
    normalize,
  });
  
  const zipLists = Array.prototype.map.call(successList, (numSuccesses, idx)=>{
    const numComplications = idx < complicationsList.length ? complicationsList[idx] : complicationsList[complicationsList.length-1];
    return [numSuccesses, numComplications]
  });

  const rows = Array.prototype.map.call(zipLists, ([numSuccesses, numComplications], idx) => (
    <tr key={`${idx}_${numSuccesses}_${numComplications}`}>
      <td>{idx}</td>
      <td>{ normalize ? Number(numSuccesses).toLocaleString(undefined, {style: 'percent', maximumFractionDigits: 5}) : Number(numSuccesses).toLocaleString(undefined)}</td>
      <td>{ normalize ? Number(numComplications).toLocaleString(undefined, {style: 'percent', maximumFractionDigits: 5}) : Number(numComplications).toLocaleString(undefined)}</td>
    </tr>
  ));
  return (
    <table>
      <caption>Cumulative Table</caption>
      <thead>
        <tr>
          <th scope="col">Count</th>
          <th scope="col">&ge;Successes</th>
          <th scope="col">&le;Complications</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
