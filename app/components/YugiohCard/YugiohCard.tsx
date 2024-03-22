import YugiohCard from "@/app/components/YugiohCard/Client";
import YugiohCardModel from "@/app/models/Card";
import { YugiohCardType } from "@/app/types/YugiohCard";
import { memo } from "react";

interface YugiohCardProps {
  id: number;
}
const component = async (props: YugiohCardProps) => {
  const cardData: YugiohCardType | null = await YugiohCardModel.findOne({ id: props.id }, { _id: 0 }).lean();
  return <>{cardData && <YugiohCard card={cardData} format="RUSH" />}</>;
};
export default memo(component);
