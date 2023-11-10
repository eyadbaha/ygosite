import { CardArtsInfo } from "@/app/components/cardArtsInfo";
import { convertTextToHTML } from "@/app/utils/convertTextToHTML";
import { getRushCard } from "@/app/utils/getRushCard";

export default async ({ params }: any) => {
  const cardInfo = await getRushCard(params.id);
  return (
    <div className="m-auto flex gap-2 w-[900px] min-h-[450px] font-KafuTechnoStd">
      <div className="w-1/3 flex flex-col">
        <CardArtsInfo cardInfo={cardInfo} format="RUSH" />
      </div>
      <div className="flex flex-col w-2/3 gap-4 h-fit">
        <p className="">
          {cardInfo.name}
          {cardInfo.legend && <span className="text-yellow-400 pl-2">LEGEND</span>}
        </p>
        {cardInfo.level && cardInfo.atk && cardInfo.def && <span className="">Attribute: {cardInfo.attribute}</span>}
        {cardInfo.level && cardInfo.atk && cardInfo.def && (
          <>
            <span className="">Level: {cardInfo.level}</span>
          </>
        )}
        <span className="">{`[${cardInfo.type.join("/")}]`}</span>
        <span
          className="col-end-3 font-roboto pb-14"
          dangerouslySetInnerHTML={{ __html: convertTextToHTML(cardInfo.desc) }}
        ></span>
        {cardInfo.level && cardInfo.atk && cardInfo.def && (
          <div className="grid grid-flow-col grid-cols-4">
            {cardInfo.maxAtk && <p className="col-end-3 text-end">MaxATK/{cardInfo.maxAtk}</p>}
            <p className="col-end-4 text-end">ATK/{cardInfo.atk} </p>
            <p className="col-end-5 text-end">DEF/{cardInfo.def}</p>
          </div>
        )}
      </div>
    </div>
  );
};
