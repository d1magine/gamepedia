import React from "react";
import Masonry from "react-masonry-css";
import FavoriteGame from "../components/FavoriteGame";

export default function Account() {
  const breakpointCols = {
    default: 4,
    1200: 3,
    930: 2,
    768: 1,
  };

  const games = new Array(10).fill(0);

  return (
    <>
      <h1 className="pb-7 pt-4">l1xly</h1>
      <h2 className="pb-12 text-3xl font-bold">Favorite games</h2>
      <Masonry
        className="mx-auto flex max-w-6xl gap-6"
        breakpointCols={breakpointCols}
      >
        {games.map(() => (
          <FavoriteGame
            coverSrc="https://media.rawg.io/media/games/d0b/d0bc26b4a79b95fa5b399d18f79fc207.jpg"
            title="The Day Before"
          />
        ))}
      </Masonry>
    </>
  );
}
