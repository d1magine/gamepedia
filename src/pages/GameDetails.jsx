import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import { Helmet } from "react-helmet";

const apiKey = import.meta.env.VITE_API_KEY;

export default function GameDetails() {
  const { gameSlug } = useParams();

  const [gameInfo, setGameInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Форматирование даты (February 10, 2023)
  function formatDate(dateToFormat) {
    const formatter = new Intl.DateTimeFormat("en-us", { month: "long" });
    const date = new Date(dateToFormat);
    return `${formatter.format(date)} ${date.getDate()}, ${date.getFullYear()}`;
  }

  // Цвет оценки metacritic
  function identifyMetacriticColor(metacritic) {
    if (metacritic >= 75) {
      return "#6dc849";
    } else if (metacritic >= 50) {
      return "#fdca52";
    }

    return "#fc4b37";
  }

  // Вызов API для получения информации об игре и скриншотов
  async function fetchGameInfo() {
    try {
      const gameDetails = await axios.get(
        `https://api.rawg.io/api/games/${gameSlug}?key=${apiKey}`
      );
      const gameScreenshots = await axios.get(
        `https://api.rawg.io/api/games/${gameSlug}/screenshots?key=${apiKey}`
      );

      setGameInfo({
        ...gameDetails.data,
        screenshots: gameScreenshots.data.results,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGameInfo();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="spinner absolute bottom-0 left-0 right-0 top-0 m-auto"></div>
      ) : (
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
          <button className="mb-8 flex items-center gap-1 rounded bg-white px-5 py-2 text-base font-semibold text-black transition-opacity ease-linear hover:opacity-70">
            <MdAdd size="24px" />
            Favorite
          </button>
          {gameInfo.background_image && (
            <div className="grid max-h-[600px] grid-cols-3 grid-rows-3 gap-x-5 gap-y-4 tablet:grid-cols-4">
              <img
                className={`${
                  gameInfo.screenshots.length <= 1
                    ? "col-span-4 row-span-4"
                    : "col-span-3 row-span-2 tablet:row-span-3"
                } h-full w-full rounded-md object-cover object-center`}
                src={gameInfo.background_image}
                alt=""
              />
              {gameInfo.screenshots.length > 1 &&
                gameInfo.screenshots
                  .slice(0, 3)
                  .map((screenshot) => (
                    <img
                      key={screenshot.id}
                      className="h-full w-full rounded-md object-cover object-center"
                      src={screenshot.image}
                      alt=""
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
                    <div className="label">Metascore:</div>
                    <div
                      style={{
                        color: identifyMetacriticColor(gameInfo.metacritic),
                        borderColor: identifyMetacriticColor(
                          gameInfo.metacritic
                        ),
                      }}
                      className={`flex aspect-square w-9 items-center justify-center rounded-full border font-bold`}
                    >
                      {gameInfo.metacritic}
                    </div>
                  </div>
                )}
                <div>
                  <div className="label mb-2">Release Date:</div>
                  <div className="font-bold underline">
                    {gameInfo.tba ? "TBA" : formatDate(gameInfo.released)}
                  </div>
                </div>
                {gameInfo.platforms.length !== 0 && (
                  <div>
                    <div className="label mb-2">Platforms:</div>
                    <div className="font-bold underline">
                      {gameInfo.platforms
                        .map((p) => p.platform.name)
                        .join(", ")}
                    </div>
                  </div>
                )}
                {gameInfo.developers.length !== 0 && (
                  <div>
                    <div className="label mb-2">Developers:</div>
                    <div className="font-bold underline">
                      {gameInfo.developers.map((dev) => dev.name).join(", ")}
                    </div>
                  </div>
                )}
                {gameInfo.genres.length !== 0 && (
                  <div>
                    <div className="label mb-2">Genres:</div>
                    <div className="font-bold underline">
                      {gameInfo.genres.map((genre) => genre.name).join(", ")}
                    </div>
                  </div>
                )}
                {gameInfo.publishers.length !== 0 && (
                  <div>
                    <div className="label mb-2">Publishers:</div>
                    <div className="font-bold underline">
                      {gameInfo.publishers
                        .map((publisher) => publisher.name)
                        .join(", ")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
