import { getAnalysis, DataType } from "../utils/getAnalysis";
import Pie from "@/app/components/Pie";
import Tabs from "@/app/components/Tabs";

interface DiagonalTableProps {
  data: DataType | null;
}
function DiagonalTable(props: DiagonalTableProps) {
  if (!props.data) return <p className="font-roboto">The server encountered and error while parsing the Meta Analysis.</p>;
  const matches = props.data.scores;
  const sortedNames = Object.keys(props.data.tops);
  if (sortedNames.length < 5) return <p className="font-roboto">There is currently not enough data available to generate a meta report.</p>;
  const totalTops = Object.values(props.data.tops).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const pieData = Object.entries(props.data.tops).map(([title, value]) => ({
    image: `https://raw.githubusercontent.com/eyadbaha/card-arts/main/decks/${encodeURIComponent(title.toLowerCase())}.webp`,
    value,
    title: `${title}\n${Math.round((value / totalTops) * 100)}%`,
  }));
  const TopsBreakdown = () => {
    if (!props.data) return <></>;
    return (
      <div className="flex-1 flex flex-col w-full max-w-[650px]">
        <p className="font-KafuTechnoStd">Tournament Tops Breakdown</p>
        <div className="dl-speed-container p-5 my-2 h-full lg:aspect-video">
          <div className="flex gap-5 max-lg:flex-col md:h-full items-center">
            <div className="md:hidden">
              <Pie pieid={1} data={pieData} size={210} />
            </div>
            <div className="w-1/2 max-md:hidden">
              <Pie pieid={2} data={pieData} size={250} />
            </div>
            <div className="w-[300px] md:w-1/2">
              <ul className="flex flex-wrap" style={{ listStyle: "square" }}>
                {Object.entries(props.data.tops).map(([title, value], index) => (
                  <li key={title} style={{ flexBasis: "50%" }} className="h-9 list-inside overflow-hidden whitespace-no-wrap truncate">
                    {value} {title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const MatchupBreakdown = () => {
    const top = sortedNames.splice(0, 10);
    return (
      <div className="flex-1 w-full max-w-[650px]">
        <p className="font-KafuTechnoStd">Matchup Breakdown</p>
        <div className="dl-speed-container p-5 my-2 flex flex-col">
          <div className="flex flex-1 w-full items-center justify-center text-center">
            <div className="flex-1"></div>
            {top.map((name, index) => (
              <div key={index} className="flex-1">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/decks/${name.toLowerCase()}.webp`}
                  alt={`Deck ${name}`}
                  className="mx-auto my-0 w-full h-full"
                />
              </div>
            ))}
          </div>
          {top.map((source, rowIndex) => (
            <div className="flex flex-1 w-full" key={source}>
              <div className="flex-1">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/decks/${source.toLowerCase()}.webp`}
                  alt={`Deck ${source}`}
                  className="mx-auto my-0 w-full h-full"
                />
              </div>
              {top.map((target, colIndex) => {
                const winrate = (matches[source]?.[target]?.win / (matches[source]?.[target]?.lose + matches[source]?.[target]?.win)) * 100;
                const color = !isNaN(winrate) ? `hsl(${((winrate || 0) * 120) / 100}, 100%, 50%)` : "unset";
                return (
                  <div key={colIndex} className="flex-1 text-xs place-content-center" style={{ backgroundColor: color }}>
                    <div className="content-center text-center">
                      {isNaN(winrate) ? (
                        "-"
                      ) : (
                        <p className="text-black">
                          {Math.round(winrate)}%
                          <br />
                          {matches[source]?.[target]?.win}-{matches[source]?.[target]?.lose}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="flex lg:w-1/2 max-md:flex-col gap-10 my-14">
        <div className="md:w-1/2">
          <p className="font-KafuTechnoStd">Top 5 decks by tournament wins</p>
          <ul className="list-disc">
            {Object.entries(props.data.wins)
              .splice(0, 5)
              .map(([title, value]) => (
                <li key={title} className="list-inside">
                  {title}: {value} wins
                </li>
              ))}
          </ul>
        </div>
        <div className="md:w-1/2">
          <p className="font-KafuTechnoStd">Top 5 decks by winrate (min. 10)</p>
          <ul className="list-disc">
            {Object.entries(props.data.rates)
              .splice(0, 5)
              .map(([title, value]) => (
                <li key={title} className="list-inside">
                  {title}: {Math.round(value * 100)}%
                </li>
              ))}
          </ul>
        </div>
      </div>
      <Tabs
        data={[
          { title: "Tournament Tops", element: <TopsBreakdown /> },
          { title: "Matchups", element: <MatchupBreakdown /> },
        ]}
      />
    </>
  );
}
export default async () => {
  const SpeedDuelData = await getAnalysis("sd");
  const SpeedRushDuelData = await getAnalysis("rd");
  const MasterDuelData = await getAnalysis("md");
  const TcgData = await getAnalysis("tcg");
  const OcgData = await getAnalysis("ocg");
  const RushDuelData = await getAnalysis("rush");
  return (
    <>
      <p className=" text-red-500">
        Please note that the current showcase utilizes a limited dataset consisting solely of some &quot;Dkayed Meta Weekly&quot; and &quot;Master Cup&quot;
        events for master duel data, and only 2 YCS events for TCG data. This restricted dataset may compromise the reliability of the report.
      </p>
      <p className="italic text-yellow-200">
        This page automatically compiles data from tournaments reported on this site, for online tournaments such as
        <span className="text-blue-400">
          <a href="http://localhost:3000/tournament/65be8eae20fa5a201b5a9596"> Duel Links Grand Prix #60</a>
        </span>
        , the process is 100% automaitc, for real life events such as
        <span className="text-blue-400">
          <a href="http://localhost:3000/tournament/65be8eae20fa5a201b5a9596"> YCS Raleigh 2024</a>
        </span>
        , the process requires manual setup for the brackets.
      </p>
      <Tabs
        data={[
          { title: "Duel Links (SPEED)", element: <DiagonalTable data={SpeedDuelData} /> },
          { title: "Duel Links (RUSH)", element: <DiagonalTable data={SpeedRushDuelData} /> },
          { title: "Master Duel", element: <DiagonalTable data={MasterDuelData} /> },
          { title: "Yu-Gi-Oh! TCG", element: <DiagonalTable data={TcgData} /> },
          { title: "Yu-Gi-Oh! OCG", element: <DiagonalTable data={OcgData} /> },
          { title: "Yu-Gi-Oh! Rush Duel", element: <DiagonalTable data={RushDuelData} /> },
        ]}
      />
    </>
  );
};
