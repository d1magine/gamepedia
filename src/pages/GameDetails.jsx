import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { MdAdd, MdDone } from "react-icons/md";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useAuth } from "../contexts/AuthContext";
import {
  formatDate,
  identifyMetacriticColor,
  handleGameClick,
} from "../utilities";
import GameFeature from "../components/GameFeature";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import ImageViewer from "../components/ImageViewer";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

export default function GameDetails({ savedGames }) {
  const location = useLocation();
  const { gameSlug } = useParams();
  const [gameInfo, setGameInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function fetchGameInfo() {
    try {
      setIsLoading(true);

      const gameDetails = await axios.get(
        `https://api.rawg.io/api/games/${gameSlug}?key=${apiKey}`
      );
      const gameScreenshots = await axios.get(
        `https://api.rawg.io/api/games/${gameSlug}/screenshots?key=${apiKey}`
      );

      gameDetails.data.metacriticColor = identifyMetacriticColor(
        gameDetails.data.metacritic
      );

      setGameInfo({
        ...gameDetails.data,
        screenshots: gameScreenshots.data.results,
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Вызов API для получения информации об игре и скриншотов
  useEffect(() => {
    if (location.pathname.includes("/games/")) {
      fetchGameInfo();
    }
  }, [location]);

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const isSaved = savedGames.find((sG) => sG.slug === gameSlug) !== undefined;

  // Обработчик кнопки favorite
  function handleClick() {
    const g = {
      slug: gameSlug,
      title: gameInfo.name_original,
      coverSrc: gameInfo.background_image,
    };

    handleGameClick(currentUser, navigate, setIsSaving, g, isSaved);
  }

  const [selectedImgIndex, setSelectedImgIndex] = useState(null);

  // Открыть галерею если была кликнута картинка
  if (selectedImgIndex !== null) {
    return (
      <ImageViewer
        images={[
          gameInfo.background_image,
          ...gameInfo.screenshots.map((s) => s.image),
        ]}
        selectedImgIndex={selectedImgIndex}
        setSelectedImgIndex={setSelectedImgIndex}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="spinner absolute bottom-0 left-0 right-0 top-0 m-auto"></div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{gameInfo.name_original}</title>
      </Helmet>
      <div className="flex items-center justify-between pb-2 pt-8 mobile:pt-12">
        <h1>{gameInfo.name_original}</h1>
      </div>
      {gameInfo.released && (
        <h2 className="pb-6 text-3xl font-medium text-white opacity-40 mobile:pb-8 mobile:text-4xl">
          {formatDate(gameInfo.released)}
        </h2>
      )}
      <button
        onClick={handleClick}
        className={`mb-8 flex items-center gap-1 rounded ${
          isSaved ? "bg-[#74e78d]" : "bg-white"
        } px-5 py-2 text-base font-semibold text-black transition-opacity ease-linear hover:opacity-70`}
      >
        {isSaving ? (
          <div className="spinner mx-2 my-0 w-[18px] border-[3px] border-black border-t-transparent"></div>
        ) : isSaved ? (
          <>
            <MdDone size="24px" />
            Favorite
          </>
        ) : (
          <>
            <MdAdd size="24px" />
            Favorite
          </>
        )}
      </button>
      {gameInfo.background_image && (
        <div className="grid max-h-[600px] grid-cols-3 grid-rows-3 gap-x-5 gap-y-4 tablet:grid-cols-4">
          <LazyLoadImage
            onClick={() => setSelectedImgIndex(0)}
            src={gameInfo.background_image}
            className="h-full w-full cursor-pointer rounded-md object-cover object-center"
            wrapperClassName={
              gameInfo.screenshots.length <= 1
                ? "col-span-4 row-span-4"
                : "col-span-3 row-span-2 tablet:row-span-3"
            }
            effect="opacity"
          />
          {gameInfo.screenshots.length > 1 &&
            gameInfo.screenshots
              .slice(0, 3)
              .map((screenshot, i) => (
                <LazyLoadImage
                  key={screenshot.id}
                  onClick={() => setSelectedImgIndex(i + 1)}
                  src={screenshot.image}
                  className="h-full w-full cursor-pointer rounded-md object-cover object-center"
                  wrapperClassName="h-full w-full"
                  effect="opacity"
                />
              ))}
        </div>
      )}
      <div className="flex flex-col justify-between gap-10 pb-24 pt-10 tablet:flex-row tablet:gap-24">
        <div className="flex-1">
          <h3 className="mb-5 text-3xl font-bold">About game</h3>
          <div className="max-w-[800px] whitespace-pre-line text-[15px] leading-6">
            {gameInfo.description_raw}
          </div>
        </div>
        <div>
          <h3 className="mb-5 text-3xl font-bold">Information</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 tablet:max-w-[350px]">
            {gameInfo.metacritic && (
              <div className="flex items-center gap-2">
                <div className="text-sm font-bold text-[#616161]">
                  Metascore:
                </div>
                <div
                  className={`flex aspect-square w-9 items-center justify-center rounded-full border font-bold ${gameInfo.metacriticColor}`}
                >
                  {gameInfo.metacritic}
                </div>
              </div>
            )}
            <div>
              <div className="mb-2 text-sm font-bold text-[#616161]">
                Release Date:
              </div>
              <div className="font-bold underline">
                {gameInfo.tba ? "TBA" : formatDate(gameInfo.released)}
              </div>
            </div>
            <GameFeature
              feature={gameInfo.platforms.map((p) => p.platform.name)}
              label="Platforms:"
            />
            <GameFeature
              feature={gameInfo.developers.map((d) => d.name)}
              label="Developers:"
            />
            <GameFeature
              feature={gameInfo.genres.map((g) => g.name)}
              label="Genres:"
            />
            <GameFeature
              feature={gameInfo.publishers.map((p) => p.name)}
              label="Publishers:"
            />
          </div>
        </div>
      </div>
    </>
  );
}
