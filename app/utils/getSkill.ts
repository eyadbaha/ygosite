import * as database from "@/app/data/skills.json";
import { SkillProps } from "../components/Skill";

export const getSkill = async (id: number) => {
  return (database.find((skill) => skill.id == id) || {
    id: 404,
    name: "Skill not found",
    desc: "^^",
  }) as SkillProps;
};
