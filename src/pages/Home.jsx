import React from "react";
import Game from "../components/Game";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet } from "react-helmet";

export default function Home({ gamesList, fetchNextPage }) {
  const breakpointCols = {
    default: 4,
    1200: 3,
    930: 2,
    768: 1,
  };

  return (
    <>
      <Helmet>
        <title>Home | Gamepedia</title>
      </Helmet>
      <h1 className="py-4 mobile:pb-12 mobile:pt-6">New games</h1>
      <InfiniteScroll
        dataLength={gamesList.games.length}
        next={fetchNextPage}
        hasMore={gamesList.hasMore}
        loader={<div className="spinner"></div>}
        endMessage={
          <p className="py-4 pb-8 text-center text-lg font-bold">
            You've seen all games! Good job!
          </p>
        }
      >
        <Masonry
          className="flex w-auto gap-6"
          breakpointCols={breakpointCols}
          columnClassName="masonry-column"
        >
          {gamesList.games.map((game) => (
            <Game
              key={game.id}
              slug={game.slug}
              title={game.name}
              genres={game.genres}
              platforms={
                game.hasOwnProperty("parent_platforms")
                  ? game.parent_platforms
                  : []
              }
              coverSrc={game.background_image}
            />
          ))}
        </Masonry>
      </InfiniteScroll>
    </>
  );
}
