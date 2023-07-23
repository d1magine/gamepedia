import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [gamesList, setGamesList] = useState({
    games: [],
    hasMore: true,
  });
  const [page, setPage] = useState(1);

  const [menuIsActive, setMenuIsActive] = useState(false);
  const mobileMenuRef = useRef(null);

  async function fetchGames() {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${apiKey}&page=${page}&page_size=40&dates=2023-01-01,2025-12-31&ordering=-added`
      );
      const fetchedGames = response.data.results;

      if (fetchedGames.length > 0) {
        setGamesList({
          ...gamesList,
          games: [...gamesList.games, ...fetchedGames],
        });
        setPage(page + 1);
      } else {
        setGamesList({
          ...gamesList,
          hasMore: false,
        });
      }
    } catch (error) {}
  }

  // Вызвать API, чтобы получить список игр
  useEffect(() => {
    fetchGames();
  }, []);

  // Скрыть мобильное меню при клике в любом месте
  document.addEventListener("mousedown", (e) => {
    if (
      mobileMenuRef.current &&
      menuIsActive &&
      !mobileMenuRef.current.contains(e.target)
    ) {
      setMenuIsActive(false);
    }
  });

  return (
    <div className="mx-auto box-content max-w-[1400px] px-4 text-white mobile:px-6">
      <Navbar
        ref={mobileMenuRef}
        menuIsActive={menuIsActive}
        setMenuIsActive={setMenuIsActive}
      />
      <Routes>
        <Route
          path="/"
          element={<Home gamesList={gamesList} fetchNextPage={fetchGames} />}
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {/* Оверлей */}
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 bg-[#000000b3] duration-150 ease-linear ${
          menuIsActive ? "visible opacity-100" : "invisible opacity-0"
        }`}
      ></div>
    </div>
  );
}

export default App;
