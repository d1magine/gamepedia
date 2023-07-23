import React from "react";
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
import { MdAdd } from "react-icons/md";

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

export default function Game({ title, genres, coverSrc, platforms }) {
  return (
    <div className="mx-auto mb-6 max-w-[440px] transition ease-linear hover:-translate-y-[7px] hover:shadow-xl">
      <div className="h-64">
        {coverSrc === null ? (
          <div className="h-full w-full rounded-t-2xl bg-neutral-950"></div>
        ) : (
          <img
            className="h-full w-full rounded-t-2xl object-cover"
            src={coverSrc}
            alt=""
          />
        )}
      </div>
      <div className="rounded-b-2xl bg-zinc-800 px-4 pb-5 pt-3">
        <h4 className="mb-1 text-2xl font-bold">{title}</h4>
        {genres.length !== 0 && (
          <p className="mb-3 text-[13px] opacity-80">
            {genres.map((genre) => genre.name).join(", ")}
          </p>
        )}
        {platforms.length !== 0 && (
          <div className="mb-4 flex items-center gap-3">
            {platforms.map((platform) => platformIcons[platform.platform.name])}
          </div>
        )}
        <button className="flex items-center gap-1 rounded bg-white px-3 py-2 text-sm font-semibold text-black transition-opacity ease-linear hover:opacity-70">
          <MdAdd size="20px" />
          Favorite
        </button>
      </div>
    </div>
  );
}
