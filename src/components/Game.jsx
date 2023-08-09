import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAdd, MdDone } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { platformIcons, handleGameClick } from "../utilities";

export default function Game({ game, platforms, isSaved }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Обработчик кнопки favorite
  function handleClick() {
    const g = {
      slug: game.slug,
      title: game.name,
      coverSrc: game.background_image,
    };

    handleGameClick(currentUser, navigate, setIsLoading, g, isSaved);
  }

  return (
    <div className="mx-auto mb-6 max-w-[440px] transition ease-linear hover:-translate-y-[7px] hover:shadow-xl">
      <div className="h-64">
        {game.background_image ? (
          <LazyLoadImage
            src={game.background_image}
            className="h-full w-full rounded-t-2xl object-cover"
            wrapperClassName="h-full w-full"
            effect="blur"
          />
        ) : (
          <div className="h-full w-full rounded-t-2xl bg-neutral-950"></div>
        )}
      </div>
      <div className="rounded-b-2xl bg-zinc-800 px-4 pb-5 pt-3">
        <Link to={`games/${game.slug}`}>
          <h4 className="mb-1 text-2xl font-bold transition-opacity ease-linear hover:opacity-60">
            {game.name}
          </h4>
        </Link>
        {game.genres.length !== 0 && (
          <p className="mb-3 text-[13px] opacity-80">
            {game.genres.map((g) => g.name).join(", ")}
          </p>
        )}
        {platforms.length !== 0 && (
          <div className="mb-4 flex items-center gap-3">
            {platforms.map((p) => platformIcons[p.platform.name])}
          </div>
        )}
        <button
          onClick={handleClick}
          className={`flex items-center gap-1 rounded ${
            isSaved ? "bg-[#74e78d]" : "bg-white"
          } px-3 py-2 text-sm font-semibold text-black transition-opacity ease-linear hover:opacity-70`}
        >
          {isLoading ? (
            <div className="spinner mx-2 my-0 w-[18px] border-[3px] border-black border-t-transparent"></div>
          ) : isSaved ? (
            <>
              <MdDone size="20px" />
              Favorite
            </>
          ) : (
            <>
              <MdAdd size="20px" />
              Favorite
            </>
          )}
        </button>
      </div>
    </div>
  );
}
