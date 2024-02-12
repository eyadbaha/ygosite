import dbConnect from "@/app/utils/dbConnect";
import mongoose from "mongoose";

export const GET = async (req: Request) => {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const db = mongoose.connection;
  if (name) {
    const skill = await db.collection("dlmSkills").findOne({ name });
    if (skill?.name && skill?.description) {
      return new Response(JSON.stringify({ name: skill.name, desc: skill.description }));
    }
  } else {
    const skillsCursor = await db.collection("dlmSkills").find();
    const skills = await skillsCursor.toArray();
    if (skills) {
      const response = skills.map((skill) => {
        if (skill?.name && skill?.description) {
          return { name: skill.name, desc: skill.description };
        }
      });
      return new Response(JSON.stringify(response));
    }
  }
  return new Response(null);
};
