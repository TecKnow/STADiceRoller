

export default function CumulativeSuccessTable({
  attribute,
  discipline,
  focus = false,
  numDice = 2,
  successes,
  normalize=true
}) {
  const successList = successes.cumulativeTable({ attribute, discipline, focus, numDice, normalize });
  const rows = Array.prototype.map.call(successList, (item, idx) => (
    <tr key={`${idx}_${item}`}>
      <td>{idx}</td>
      <td>{item}</td>
    </tr>
  ));
  return (
    <table>
      <caption>Cumulative Table</caption>
      <thead>
        <tr>
          <th scope="col">At least n successes</th>
          <th scope="col">Frequency</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
