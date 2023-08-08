import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export default function FavoriteGame({ game }) {
  const { currentUser } = useAuth();

  // Удалить игру из избранных
  async function handleRemoveGame() {
    try {
      const docRef = doc(db, "users", currentUser.email);

      await updateDoc(docRef, {
        savedGames: arrayRemove(game),
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mx-auto mb-6 max-w-[440px] transition ease-linear hover:-translate-y-[7px] hover:shadow-xl">
      <div className="h-48">
        <img
          className="h-full w-full rounded-t-2xl object-cover"
          src={game.coverSrc}
          alt=""
        />
      </div>
      <div className="rounded-b-2xl bg-zinc-800 px-4 pb-5 pt-3">
        <Link to={`/games/${game.slug}`}>
          <h4 className="mb-4 text-2xl font-bold transition-opacity ease-linear hover:opacity-60">
            {game.title}
          </h4>
        </Link>
        <button
          onClick={handleRemoveGame}
          className="flex items-center gap-1 rounded bg-[#ffd6d6] px-3 py-2 text-sm font-semibold text-black transition-opacity ease-linear hover:opacity-70"
        >
          <IoMdClose size="20px" />
          Remove
        </button>
      </div>
    </div>
  );
}
