import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BsWindows,
  BsPlaystation,
  BsXbox,
  BsApple,
  BsAndroid,
  BsPhone,
} from "react-icons/bs";
import { FaLinux } from "react-icons/fa";
import { SiNintendo, SiSega } from "react-icons/si";
import { TbWorldWww } from "react-icons/tb";
import { MdAdd, MdDone } from "react-icons/md";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

const iconSize = "14px";
const platformIcons = {
  PC: <BsWindows key="pc" size={iconSize} />,
  PlayStation: <BsPlaystation key="playstation" size="18px" />,
  Xbox: <BsXbox key="xbox" size={iconSize} />,
  iOS: <BsPhone key="ios" size={iconSize} />,
  Android: <BsAndroid key="android" size={iconSize} />,
  "Apple Macintosh": <BsApple key="mac" size={iconSize} />,
  Linux: <FaLinux key="linux" size="15px" />,
  Nintendo: <SiNintendo key="nintendo" size={iconSize} />,
  SEGA: <SiSega key="sega" size={iconSize} />,
  Web: <TbWorldWww key="web" size={iconSize} />,
};

export default function Game({ game, platforms, isSaved }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Сохранить или удалить игру
  async function handleGameClick() {
    if (!currentUser) {
      return navigate("/signup");
    }

    try {
      setIsLoading(true);

      const g = {
        slug: game.slug,
        title: game.name,
        coverSrc: game.background_image,
      };

      const docRef = doc(db, "users", currentUser.email);

      if (isSaved) {
        await updateDoc(docRef, {
          savedGames: arrayRemove(g),
        });
      } else {
        await updateDoc(docRef, {
          savedGames: arrayUnion(g),
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto mb-6 max-w-[440px] transition ease-linear hover:-translate-y-[7px] hover:shadow-xl">
      <div className="h-64">
        {game.background_image ? (
          <img
            className="h-full w-full rounded-t-2xl object-cover"
            src={game.background_image}
            alt=""
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
            {platforms.map((platform) => platformIcons[platform.platform.name])}
          </div>
        )}
        <button
          onClick={handleGameClick}
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
