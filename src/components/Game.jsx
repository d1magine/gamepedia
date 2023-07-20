import React from "react";
import { BsPlaystation } from "react-icons/bs";
import { MdAdd } from "react-icons/md";

export default function Game() {
  return (
    <div className="max-w-[440px] duration-150 hover:scale-[1.01] hover:drop-shadow-[7px_7px_8px_rgba(0,0,0,0.25)]">
      <div className="h-64">
        <img
          className="h-full rounded-t-2xl object-cover object-center"
          src="https://media.rawg.io/media/games/909/909974d1c7863c2027241e265fe7011f.jpg"
          alt=""
        />
      </div>
      <div className="rounded-b-2xl bg-[#2C2E34] px-4 pb-5 pt-3">
        <h4 className="mb-1 text-2xl font-bold">The Last of Us Part II</h4>
        <p className="mb-2 text-[13px] opacity-80">
          Sony Interactive Entertainment
        </p>
        <div className="mb-3">
          <BsPlaystation size="18px" />
        </div>
        <button className="flex items-center gap-1 rounded bg-white px-3 py-2 text-sm font-semibold text-black">
          <MdAdd size="20px" />
          Favorite
        </button>
      </div>
    </div>
  );
}
