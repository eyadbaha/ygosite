"use client";

import { useEffect, useState } from "react";

interface userProps {
  id: bigint;
}
export default (props: userProps) => {
  const [content, setContent] = useState(<span>Loading...</span>);
  useEffect(() => {
    const getUser = async () => {
      const request = await fetch(`/api/users?id=${props.id}`);
      const result = await request.json();
      if (result?.name) setContent(<span className="text-blue-500">{result.name}</span>);
      else setContent(<span className="text-red-500">User Not Found</span>);
    };
    getUser();
  }, []);
  return <>{content}</>;
};
