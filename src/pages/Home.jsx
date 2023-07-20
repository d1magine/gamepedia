import React from "react";
import Game from "../components/Game";

export default function Home({ games }) {
  return (
    <>
      <h1 className="pt-6">New games</h1>
      <div className="grid grid-cols-1 justify-items-center gap-6 pb-10 pt-6 mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4">
        <Game />
        <Game />
        <Game />
        <Game />
        <Game />
        <Game />
        <Game />
        <Game />
        <Game />
        <Game />
      </div>
    </>
  );
}
