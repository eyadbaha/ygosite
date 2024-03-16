import getMatchups from "../utils/getMatchups";

function getSortedUniqueNames(matches: any) {
  const uniqueNamesArray = Array.from(new Set(Object.keys(matches).concat(Object.keys(matches).flatMap((source) => Object.keys(matches[source]))))).sort(
    (a, b) => {
      const totalMatchesA = Object.values(matches[a] || {}).reduce((total, opponent: any) => total + opponent.win + opponent.lose, 0) as number;

      const totalMatchesB = Object.values(matches[b] || {}).reduce((total, opponent: any) => total + opponent.win + opponent.lose, 0) as number;

      return totalMatchesB - totalMatchesA;
    }
  );

  return uniqueNamesArray;
}

function DiagonalTable({ matches }: any) {
  const sortedNames = getSortedUniqueNames(matches);

  const calculateWinRate = (source: any, target: any) => {
    if (source === target) {
      return "-";
    }

    const wins = matches[source]?.[target]?.win || 0;
    const losses = matches[source]?.[target]?.lose || 0;

    const totalMatches = wins + losses;
    return totalMatches === 0 ? "-" : `${((wins / totalMatches) * 100).toFixed(2)}%`;
  };

  return (
    <table className="w-1/2 text-center m-auto">
      <thead>
        <tr>
          <th></th>
          {sortedNames.map((name, index) => (
            <th key={index}>
              <img
                src={`/img/decks/${name.toLowerCase()}.webp`}
                alt={`Deck ${name}`}
                width="50" // Set the desired width
                height="50" // Set the desired height
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedNames.map((source, rowIndex) => (
          <tr key={rowIndex}>
            <th key={source}>
              <img
                src={`/img/decks/${source.toLowerCase()}.webp`}
                alt={`Deck ${source}`}
                width="50" // Set the desired width
                height="50" // Set the desired height
              />
            </th>
            {sortedNames.map((target, colIndex) => (
              <td key={colIndex}>{calculateWinRate(source, target)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default async () => {
  const matchups = await getMatchups();
  return <DiagonalTable matches={matchups} />;
};
