

export default function ExactSuccessTable({
  attribute,
  discipline,
  focus = false,
  numDice = 2,
  successes,
  normalize=true
}) {
  const successList = successes.frequencyTable({ attribute, discipline, focus, numDice, normalize });
  const rows = Array.prototype.map.call(successList, (item, idx) => (
    <tr key={`${idx}_${item}`}>
      <td>{idx}</td>
      <td>{item}</td>
    </tr>
  ));
  return (
    <table>
      <caption>Frequency Table</caption>
      <thead>
        <tr>
          <th scope="col">Successes</th>
          <th scope="col">Frequency</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
