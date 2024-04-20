import { getMatchups, DataType } from "../utils/getMatchups";
import Pie from "@/app/components/Pie";

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
interface DiagonalTableProps {
  data: DataType;
}
function DiagonalTable(props: DiagonalTableProps) {
  const matches = props.data.scores;
  const sortedNames = getSortedUniqueNames(matches);
  const totalTops = Object.entries(props.data.tops)
    .map(([title, value]) => value)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0) as number;
  const pieData = Object.entries(props.data.tops).map(([title, value]) => ({
    image: `https://raw.githubusercontent.com/eyadbaha/card-arts/main/decks/${encodeURIComponent(title.toLowerCase())}.webp`,
    value,
    title: `${title}\n${Math.round((value / totalTops) * 100)}%`,
  })) as any;
  const calculateWinRate = (source: any, target: any) => {
    if (source === target) {
      return "-";
    }
    const wins = matches[source]?.[target]?.win || 0;
    const losses = matches[source]?.[target]?.lose || 0;
    const totalMatches = wins + losses;
    return totalMatches === 0 ? "-" : `${Math.round((wins / totalMatches) * 100)}%`;
  };
  return (
    <>
      <div className="flex w-full max-md:flex-col gap-10">
        <div className="w-full md:w-1/2">
          <p className="font-KafuTechnoStd">Tournament Tops Breakdown</p>
          <div className="dl-speed-container p-5 my-2 h-full">
            <div className="flex gap-5 max-md:flex-col md:h-full items-center">
              <div className="md:w-1/2">
                <Pie data={pieData} size={350} />
              </div>
              <div className="w-[300px] md:w-1/2">
                <ul className="flex flex-wrap" style={{ listStyle: "square" }}>
                  {Object.entries(props.data.tops).map(([title, value], index) => (
                    <li key={title} style={{ flexBasis: "50%" }} className="h-9 list-inside">
                      {value} {title}
                    </li>
                  ))}
                </ul>
                {/* <ul className="md:h-[300px] flex md:flex-col flex-wrap" style={{ listStyle: "square" }}>
                  {Object.entries(props.data.tops).map(([title, value], index) => (
                    <li key={title} style={{ flexBasis: "20%" }} className="ml-8">
                      {value} {title}
                    </li>
                  ))}
                </ul> */}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <p className="font-KafuTechnoStd">Matchup Breakdown</p>
          <div className="dl-speed-container p-10 my-2 h-full">
            <div className="flex w-full items-center justify-center text-center">
              <div className="flex-1"></div>
              {sortedNames.map((name, index) => (
                <div key={index} className="flex-1">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/decks/${name.toLowerCase()}.webp`}
                    alt={`Deck ${name}`}
                    width="50" // Set the desired width
                    height="50" // Set the desired height
                    className="mx-auto my-0"
                  />
                </div>
              ))}
            </div>
            {sortedNames.map((source, rowIndex) => (
              <div className="flex w-full items-center justify-center text-center" key={source}>
                <div className="flex-1">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/decks/${source.toLowerCase()}.webp`}
                    alt={`Deck ${source}`}
                    width="50" // Set the desired width
                    height="50" // Set the desired height
                  />
                </div>
                {sortedNames.map((target, colIndex) => (
                  <div key={colIndex} className="flex-1 text-xs">
                    {calculateWinRate(source, target)}
                    {calculateWinRate(source, target) != "-" && (
                      <>
                        <br />
                        {matches[source]?.[target]?.win}-{matches[source]?.[target]?.lose}
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full max-md:flex-col gap-10 my-14">
        <div className="md:w-1/2">
          <p className="font-KafuTechnoStd">Top 5 decks by tournament wins</p>
          <ul>
            {Object.entries(props.data.wins)
              .splice(0, 5)
              .map(([title, value], index) => (
                <li key={title}>
                  {title}: {value} wins
                </li>
              ))}
          </ul>
        </div>
        <div className="md:w-1/2">
          <p className="font-KafuTechnoStd">Top 5 decks by overall winrate (min. 10)</p>
          <ul>
            {Object.entries(props.data.rates)
              .splice(0, 5)
              .map(([title, value], index) => (
                <li key={title}>
                  {title}: {Math.round(value * 100)}%
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export default async () => {
  const matchups = await getMatchups();
  if (!matchups) return <div>Error loading Meta Analysis</div>;
  return <DiagonalTable data={matchups} />;
};
