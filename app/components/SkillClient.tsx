"use client";
import { useEffect, useState } from "react";
import { Skill, SkillProps } from "./Skill";

interface SkillClientProps {
  name: string;
}
export default (props: SkillClientProps) => {
  const [component, setComponent] = useState<null | JSX.Element>(null);

  useEffect(() => {
    const getSkill = async () => {
      const request = await fetch(`/api/skills?name=${props.name}`);
      const json = (await request.json()) as SkillProps | undefined;
      if (json?.name) setComponent(<Skill inline {...json} />);
      else setComponent(<span className="text-red-500">Skill Not Found</span>);
    };
    getSkill();
  }, []);
  if (component) return <>{component}</>;
  return <span>Loading...</span>;
};
