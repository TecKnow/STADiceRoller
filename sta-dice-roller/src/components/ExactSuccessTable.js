export default function ExactSuccessTable({
  attribute,
  discipline,
  focus = false,
  numDice = 2,
  successes,
  complications,
  complicationsRange,
  normalize = true,
}) {

  const successList = successes.frequencyTable({
    attribute,
    discipline,
    focus,
    numDice,
    normalize,
  });

  const complicationsList = complications.frequencyTable({
    numDice,
    complicationsRange,
    normalize,
  });

  const zipLists = Array.prototype.map.call(successList, (numSuccesses, idx)=>{
    const numComplications = idx < complicationsList.length ? complicationsList[idx] : 0;
    return [numSuccesses, numComplications]
  });

  const rows = Array.prototype.map.call(zipLists, ([numSuccesses, numComplications], idx) => (
    <tr key={`${idx}_${numSuccesses}_${numComplications}`}>
      <td>{idx}</td>
      <td>{normalize? Number(numSuccesses).toLocaleString(undefined, {style: 'percent', maximumFractionDigits: 5}): Number(numSuccesses).toLocaleString()}</td>
      <td>{normalize? Number(numComplications).toLocaleString(undefined, {style: 'percent', maximumFractionDigits: 5}): Number(numComplications).toLocaleString()}</td>
    </tr>
  ));
  
  return (
    <table>
      <caption>Frequency Table</caption>
      <thead>
        <tr>
          <th scope="col">Count</th>
          <th scope="col">Successes</th>
          <th scope="col">Failures</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
