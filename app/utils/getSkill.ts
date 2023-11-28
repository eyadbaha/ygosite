import { SkillProps } from "../components/Skill";
import dbConnect from "./dbConnect";
import Skill from "../models/Skill";

export const getSkill = async (id: number) => {
  await dbConnect();
  const data = await Skill.findOne({ id }, { _id: 0 }).lean();
  return (data || {
    id: 404,
    name: "Skill not found",
    desc: "^^",
  }) as SkillProps;
};
