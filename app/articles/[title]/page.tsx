import { notFound } from "next/navigation";
import Articles from "@/app/models/Articles";
import dbConnect from "@/app/utils/dbConnect";
import Markdown from "@/app/components/Markdown/Markdown";

export default async ({ params }: any) => {
  await dbConnect();
  const data = await Articles.findOne({ title: params.title || "" }, { _id: 0 }).lean();
  if (!data) return notFound();
  return <Markdown text={data.markdown} />;
};
