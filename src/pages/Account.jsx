import React from "react";
import Masonry from "react-masonry-css";
import FavoriteGame from "../components/FavoriteGame";
import { useAuth } from "../contexts/AuthContext";
import { Helmet } from "react-helmet";
import { masonryBreakpointCols } from "../utilities";

export default function Account({ savedGames, loading }) {
  const { currentUser } = useAuth();

  return (
    <>
      <Helmet>
        <title>{`${currentUser.displayName}'s games | Gamepedia`}</title>
      </Helmet>
      <h1 className="pb-7 pt-4">{currentUser.displayName}</h1>
      <h2 className="pb-12 text-3xl font-bold">Favorite games</h2>
      {loading ? (
        <div className="spinner absolute bottom-0 left-0 right-0 top-0 m-auto"></div>
      ) : savedGames.length === 0 ? (
        <p className="mt-40 text-center text-sm opacity-60">
          You haven't saved any games.
        </p>
      ) : (
        <Masonry
          className="mx-auto flex max-w-6xl gap-6"
          breakpointCols={masonryBreakpointCols}
        >
          {savedGames.map((game) => (
            <FavoriteGame key={game.slug} game={game} />
          ))}
        </Masonry>
      )}
    </>
  );
}
