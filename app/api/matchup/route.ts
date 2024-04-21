import { getAnalysis } from "@/app/utils/getAnalysis";

export const GET = async (req: Request) => {
  try {
    const res = await getAnalysis("md");
    return new Response(JSON.stringify(res));
  } catch (err) {
    console.log(err);
    return new Response("Not cool");
  }
};
