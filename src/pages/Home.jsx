import React from "react";
import Game from "../components/Game";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet } from "react-helmet";
import { masonryBreakpointCols } from "../utilities";

export default function Home({ gamesList, fetchNextPage, savedGames }) {
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
          breakpointCols={masonryBreakpointCols}
          columnClassName="masonry-column"
        >
          {gamesList.games.map((g) => (
            <Game
              key={g.id}
              game={g}
              platforms={g?.parent_platforms ? g.parent_platforms : []}
              isSaved={
                savedGames.find((sg) => sg.slug === g.slug) !== undefined
              }
            />
          ))}
        </Masonry>
      </InfiniteScroll>
    </>
  );
}
