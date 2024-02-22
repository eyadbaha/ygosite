"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default () => {
  const [tournaments, setTournaments] = useState<any>([]);

  useEffect(() => {
    const getTournaments = async () => {
      const request = await fetch("/api/tournaments?state=2");
      const tournaments = await request.json();
      setTournaments(tournaments);
    };
    getTournaments();
  }, []);
  const tournamentClick = () => {};
  return (
    <>
      {tournaments &&
        tournaments.map((tournament: any) => {
          return (
            <Link href={`/tournament-edit/${tournament._id}`} key={tournament._id}>
              <div onClick={tournamentClick}>{tournament.title}</div>
            </Link>
          );
        })}
    </>
  );
};
