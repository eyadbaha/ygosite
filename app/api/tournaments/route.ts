import dbConnect from "@/app/utils/dbConnect";
import Tournaments from "@/app/models/Tournaments";

export async function GET(request: Request) {
  await dbConnect();
  const currentDate = new Date();
  const result = await Tournaments.find({ date: { $gt: currentDate } }).lean();
  return new Response(JSON.stringify(result));
}
