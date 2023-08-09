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

// Форматирование даты к виду - February 10, 2023
export function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

// Определить цвет оценки metacritic
export function identifyMetacriticColor(value) {
  if (value >= 75) {
    return `border-[#6dc849] text-[#6dc849]`;
  } else if (value >= 50) {
    return `border-[#fdca52] text-[#fdca52]`;
  }

  return `border-[#fc4b37] text-[#fc4b37]`;
}

// Брейкпойнты для masonry
export const masonryBreakpointCols = {
  default: 4,
  1200: 3,
  930: 2,
  768: 1,
};

// Иконки для платформ игр
const iconSize = "14px";

export const platformIcons = {
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
