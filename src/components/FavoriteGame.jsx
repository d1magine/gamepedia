import React from "react";
import { MdAdd } from "react-icons/md";

export default function FavoriteGame({ coverSrc, title }) {
  return (
    <div className="mx-auto mb-6 max-w-[440px] transition ease-linear hover:-translate-y-[7px] hover:shadow-xl">
      <div className="h-48">
        <img
          className="h-full w-full rounded-t-2xl object-cover"
          src={coverSrc}
          alt=""
        />
      </div>
      <div className="rounded-b-2xl bg-zinc-800 px-4 pb-5 pt-3">
        <h4 className="mb-1 text-2xl font-bold transition-opacity ease-linear hover:opacity-60">
          {title}
        </h4>
        <button className="flex items-center gap-1 rounded bg-white px-3 py-2 text-sm font-semibold text-black transition-opacity ease-linear hover:opacity-70">
          <MdAdd size="20px" />
          Favorite
        </button>
      </div>
    </div>
  );
}
