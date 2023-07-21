import React from "react";
import Game from "../components/Game";
import Masonry from "react-masonry-css";

export default function Home({ games }) {
  const breakpointCols = {
    default: 4,
    1200: 3,
    930: 2,
    768: 1,
  };

  return (
    <>
      <h1 className="py-4 mobile:pb-12 mobile:pt-6">New games</h1>
      <Masonry
        className="-ml-6 flex w-auto"
        breakpointCols={breakpointCols}
        columnClassName="masonry-column"
      >
        {games.map((game) => (
          <Game
            key={game.id}
            title={game.name}
            genres={game.genres}
            platforms={game.parent_platforms}
            coverSrc={game.background_image}
          />
        ))}
      </Masonry>
    </>
  );
}
