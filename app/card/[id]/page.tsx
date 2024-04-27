import { notFound } from "next/navigation";
import { CardArtsInfo } from "@/app/components/cardArtsInfo";
import { convertTextToHTML } from "@/app/utils/convertTextToHTML";
import Card from "@/app/models/Card";
import dbConnect from "@/app/utils/dbConnect";

export default async ({ params }: any) => {
  await dbConnect();
  const cardData = await Card.findOne({ id: params.id | 0 }, { _id: 0 }).lean();
  if (!cardData) return notFound();
  const isMonster: boolean = "atk" in cardData && "level" in cardData;
  let level = "Level";
  if (cardData.types.includes("Xyz")) {
    level = "Rank";
  } else if (cardData.types.includes("Link")) {
    level = "Link Rating";
  }
  return (
    <div className="m-auto flex gap-2 w-[900px] min-h-[450px] font-KafuTechnoStd">
      <div className="w-1/3 flex flex-col">
        <CardArtsInfo cardInfo={cardData} format="SPEED" />
      </div>
      <div className="flex flex-col w-2/3 gap-4 h-fit">
        <p className="">
          {cardData.name}
          {"legend" in cardData && cardData.legend == true && <span className="text-yellow-400 pl-2">LEGEND</span>}
        </p>
        {isMonster && <span className="">Attribute: {cardData.attribute}</span>}
        {"atk" in cardData && "level" in cardData && (
          <>
            <span className="">
              {level}: {cardData.level}
            </span>
          </>
        )}
        <span className="">{`[${cardData.types.join("/")}]`}</span>
        <span className="col-end-3 font-roboto pb-14" dangerouslySetInnerHTML={{ __html: convertTextToHTML(cardData.desc) }}></span>
        {"atk" in cardData && (
          <div className="grid grid-flow-col grid-cols-4">
            {"maxAtk" in cardData && <p className="col-end-3 text-end">MaxATK/{cardData.maxAtk}</p>}
            <p className="col-end-4 text-end">ATK/{cardData.atk} </p>
            {"def" in cardData && <p className="col-end-5 text-end">DEF/{cardData.def}</p>}
          </div>
        )}
      </div>
    </div>
  );
};
