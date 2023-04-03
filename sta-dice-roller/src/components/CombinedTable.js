export default function CombinedTable({
    attribute,
    discipline,
    focus = false,
    numDice = 2,
    successes,
    complications,
    complicationsRange,
    normalize = true,
  }) {
  
    const exactSuccessList = successes.frequencyTable({
      attribute,
      discipline,
      focus,
      numDice,
      normalize,
    });
  
    const exactComplicationsList = complications.frequencyTable({
      numDice,
      complicationsRange,
      normalize,
    });

    const cumulativeSuccessList = successes.cumulativeTable({ attribute, discipline, focus, numDice, normalize});
  
    const cumulativeComplicationsList = complications.cumulativeTable({
      numDice,
      complicationsRange,
      normalize,
    });
  
    const zipLists = Array.prototype.map.call(exactSuccessList, (exactSuccesses, idx)=>{
      const exactComplications = idx < exactComplicationsList.length ? exactComplicationsList[idx] : 0;
      const cumulativeSuccesses = cumulativeSuccessList[idx]
      const cumulativeComplications = idx < cumulativeComplicationsList.length ? cumulativeComplicationsList[idx] : cumulativeComplicationsList[cumulativeComplicationsList.length-1]
      return [exactSuccesses, cumulativeSuccesses, exactComplications, cumulativeComplications]
    });
  
    const rows = Array.prototype.map.call(zipLists, ([exactSuccesses, cumulativeSuccesses, exactComplications, cumulativeComplications], idx) => (
      <tr key={`${idx}_${exactSuccesses}_${exactComplications}`}>
        <td>{idx}</td>
        <td>{normalize? Number(exactSuccesses).toLocaleString(undefined, {style: 'percent', maximumFractionDigits: 5}): Number(exactSuccesses).toLocaleString()}</td>
        <td>{ normalize ? Number(cumulativeSuccesses).toLocaleString(undefined, {style: 'percent', maximumFractionDigits: 5}) : Number(cumulativeSuccesses).toLocaleString(undefined)}</td>
        <td>{normalize? Number(exactComplications).toLocaleString(undefined, {style: 'percent', maximumFractionDigits: 5}): Number(exactComplications).toLocaleString()}</td>
        <td>{ normalize ? Number(cumulativeComplications).toLocaleString(undefined, {style: 'percent', maximumFractionDigits: 5}) : Number(cumulativeComplications).toLocaleString(undefined)}</td>
      </tr>
    ));
    
    return (
      <table>
        <caption>Frequency Table</caption>
        <thead>
          <tr>
            <th scope="col">Count</th>
            <th scope="col">Successes</th>
            <th scope="col">&ge;Successes</th>
            <th scope="col">Complications</th>
            <th scope="col">&le;Complications</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  