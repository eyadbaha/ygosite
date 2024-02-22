import getMatchups from "@/app/utils/getMatchups";

export const GET = async (req: Request) => {
  try {
    const res = await getMatchups();
    return new Response(JSON.stringify(res));
  } catch (err) {
    console.log(err);
    return new Response("Not cool");
  }
};
