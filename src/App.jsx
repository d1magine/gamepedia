import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [games, setGames] = useState([]);
  const url =
    "https://api.rawg.io/api/games?key=f27b088f0fd34d2b84364897a8aac398&page=1&page_size=40&dates=2023-01-01,2024-12-31&ordering=-added";

  const [menuIsActive, setMenuIsActive] = useState(false);
  const mobileMenuRef = useRef(null);

  // API вызов, чтобы получить список игр
  useEffect(() => {
    // axios.get(url).then((response) => {
    //   setGames(response.data.results);
    // });
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
    <div className="mx-auto box-content max-w-[1200px] px-4 text-white mobile:px-6">
      <Navbar
        ref={mobileMenuRef}
        menuIsActive={menuIsActive}
        setMenuIsActive={setMenuIsActive}
      />
      <Routes>
        <Route path="/" element={<Home games={games} />} />
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
