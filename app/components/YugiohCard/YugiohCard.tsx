import YugiohCard from "@/app/components/YugiohCard/Client";
import YugiohCardModel from "@/app/models/Card";
import { YugiohCardType } from "@/app/types/YugiohCard";

interface YugiohCardProps {
  id: number;
}
export default async (props: YugiohCardProps) => {
  const cardData: YugiohCardType | null = await YugiohCardModel.findOne({ id: props.id }, { _id: 0 }).lean();
  return <>{cardData && <YugiohCard card={cardData} format="RUSH" />}</>;
};
