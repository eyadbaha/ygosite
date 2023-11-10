"use client";
import useTimer from "../hooks/useTimer";

type timerProps = {
  time: number;
  message?: string;
};
export default (props: timerProps) => {
  const message = useTimer(props);
  return <>{message}</>;
};
