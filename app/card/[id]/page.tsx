import { CardArtsInfo } from "@/app/components/cardArtsInfo";
import { convertTextToHTML } from "@/app/utils/convertTextToHTML";
import { getOcgCard } from "@/app/utils/getOcgCard";

export default async ({ params }: any) => {
  const cardInfo = await getOcgCard(params.id);
  const isMonster: boolean = cardInfo.level != undefined && cardInfo.atk != undefined;
  let level = "Level";
  if (cardInfo.type.includes("XYZ")) {
    level = "Rank";
  } else if (cardInfo.type.includes("Link")) {
    level = "Link Rating";
  }
  return (
    <div className="m-auto flex gap-2 w-[900px] min-h-[450px] font-KafuTechnoStd">
      <div className="w-1/3 flex flex-col">
        <CardArtsInfo cardInfo={cardInfo as any} format="SPEED" />
      </div>
      <div className="flex flex-col w-2/3 gap-4 h-fit">
        <p className="">
          {cardInfo.name}
          {cardInfo.legend && <span className="text-yellow-400 pl-2">LEGEND</span>}
        </p>
        {isMonster && <span className="">Attribute: {cardInfo.attribute}</span>}
        {isMonster && (
          <>
            <span className="">
              {level}: {cardInfo.level}
            </span>
          </>
        )}
        <span className="">{`[${cardInfo.type.join("/")}]`}</span>
        <span
          className="col-end-3 font-roboto pb-14"
          dangerouslySetInnerHTML={{ __html: convertTextToHTML(cardInfo.desc) }}
        ></span>
        {isMonster && (
          <div className="grid grid-flow-col grid-cols-4">
            {cardInfo.maxAtk && <p className="col-end-3 text-end">MaxATK/{cardInfo.maxAtk}</p>}
            <p className="col-end-4 text-end">ATK/{cardInfo.atk} </p>
            {cardInfo.def && <p className="col-end-5 text-end">DEF/{cardInfo.def}</p>}
          </div>
        )}
      </div>
    </div>
  );
};
