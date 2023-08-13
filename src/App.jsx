import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { useState, useRef, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GameDetails from "./pages/GameDetails";
import Account from "./pages/Account";
import { useAuth } from "./contexts/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

function App() {
  const [gamesList, setGamesList] = useState({
    games: [],
    hasMore: true,
    currentPage: 1,
  });

  async function fetchGames() {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${apiKey}&page=${gamesList.currentPage}&page_size=40&dates=2023-01-01,2025-12-31&ordering=-added`
      );
      const results = response.data.results;

      if (results.length > 0) {
        setGamesList({
          ...gamesList,
          games: [...gamesList.games, ...results],
          currentPage: gamesList.currentPage + 1,
        });
      } else {
        setGamesList({
          ...gamesList,
          hasMore: false,
        });
      }
    } catch (error) {}
  }

  // Вызвать API, чтобы получить список популярных игр
  useEffect(() => {
    fetchGames();
  }, []);

  const [savedGames, setSavedGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Получить сохраненные игры
  useEffect(() => {
    if (!currentUser) {
      return setSavedGames([]);
    }

    // Обновление state'а сохраненных игр в реальном времени
    const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      setSavedGames(doc.data().savedGames);
      setLoading(false);
    });

    return () => unsubscribe;
  }, [currentUser]);

  const [menuIsActive, setMenuIsActive] = useState(false);
  const mobileMenuRef = useRef(null);

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
    <div
      className={`mx-auto box-content max-w-[1400px] px-4 text-white mobile:px-10`}
    >
      <Navbar
        ref={mobileMenuRef}
        menuIsActive={menuIsActive}
        setMenuIsActive={setMenuIsActive}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              gamesList={gamesList}
              fetchNextPage={fetchGames}
              savedGames={savedGames}
            />
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/games/:gameSlug"
          element={<GameDetails savedGames={savedGames} />}
        />
        <Route
          path="/account"
          element={
            currentUser ? (
              <Account savedGames={savedGames} loading={loading} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
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
