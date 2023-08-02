import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { HiOutlineSearch } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdLogin } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { GoPersonAdd } from "react-icons/go";

const apiKey = import.meta.env.VITE_RAWG_API_KEY;

const Navbar = forwardRef((props, ref) => {
  const { menuIsActive, setMenuIsActive } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchIsFocused, setSearchIsFocused] = useState(false);

  const location = useLocation();

  // Autocomplete
  useEffect(() => {
    setSuggestions(null);

    if (searchQuery === "" || !searchIsFocused) {
      return;
    }

    const searchGames = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${apiKey}&page_size=10&page=1&search=${searchQuery}`
        );
        const results = response.data.results;

        setSuggestions(results);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);

    const timer = setTimeout(() => {
      searchGames();
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery, searchIsFocused]);

  // Очистить поисковый запрос, когда URL изменился
  useEffect(() => {
    setSearchQuery("");
  }, [location]);

  function handleItemClick() {
    setSearchIsFocused(false);
  }

  function handleSearchBlur() {
    setTimeout(() => {
      setSearchIsFocused(false);
      setSuggestions(null);
    }, 130);
  }

  return (
    <nav className="relative flex items-center justify-between gap-2 pt-3 mobile:gap-5 mobile:pt-6">
      <Helmet>
        <body className={`${menuIsActive ? "overflow-hidden" : ""}`} />
      </Helmet>
      <Link className="text-sm font-bold uppercase mobile:text-xl" to="/">
        gamepedia
      </Link>
      <div className="relative flex-1">
        <HiOutlineSearch
          size="19px"
          className="absolute left-3.5 top-1/2 mt-[-9px]"
        />
        <input
          className="w-full rounded-md bg-[#3D3F43] px-5 py-2 pl-10 text-sm placeholder:text-[#ffffffb3] focus:outline-none focus:ring-1 focus:ring-white mobile:py-2.5 mobile:pl-11 mobile:text-base"
          type="text"
          placeholder="Search games"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setSearchIsFocused(true)}
          onBlur={handleSearchBlur}
        />
        {
          /* Предложения поиска */
          searchIsFocused && searchQuery !== "" && (
            <div className="absolute left-0 right-0 top-14 z-10 rounded-xl bg-neutral-950 px-4 py-2.5 shadow-xl">
              {isLoading && <div className="spinner my-4"></div>}
              {suggestions && (
                <div>
                  {suggestions.length === 0 ? (
                    <div className="my-4 font-bold">Nothing is found</div>
                  ) : (
                    suggestions.map((item) => (
                      <Link
                        key={item.id}
                        onClick={handleItemClick}
                        to={`games/${item.slug}`}
                        className="transition hover:cursor-pointer hover:opacity-70"
                      >
                        <div className="flex items-center gap-3 py-1.5">
                          {item.background_image === null ? (
                            <div className="h-12 w-10 rounded bg-black"></div>
                          ) : (
                            <img
                              className="h-12 w-10 rounded object-cover object-center"
                              src={item.background_image}
                              alt=""
                            />
                          )}

                          <p className="text-sm font-bold">{item.name}</p>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          )
        }
      </div>
      <Link
        className="hidden rounded px-4 py-1.5 text-sm font-bold duration-200 hover:opacity-70 mobile:block"
        to="/login"
      >
        Log In
      </Link>
      <Link
        className="hidden rounded bg-white px-4 py-1.5 text-sm font-bold text-black duration-200 hover:opacity-70 mobile:block"
        to="/signup"
      >
        Sign Up
      </Link>
      <RxHamburgerMenu
        onClick={() => setMenuIsActive(true)}
        size="20px"
        className="cursor-pointer mobile:hidden"
      />
      {/* Мобильное меню */}
      <div
        ref={ref}
        className={`fixed right-1.5 top-1.5 z-50 duration-150 ease-linear ${
          menuIsActive ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="w-40 rounded-lg bg-white p-4 text-black">
          <li className="mb-2 flex justify-end">
            <GrClose
              className="cursor-pointer"
              onClick={() => setMenuIsActive(false)}
              size="20px"
            />
          </li>
          <li className="mb-3 flex items-center gap-2 text-lg">
            <MdLogin size="24px" />
            <Link onClick={() => setMenuIsActive(false)} to={"/login"}>
              Log In
            </Link>
          </li>
          <li className="flex items-center gap-2 text-lg">
            <GoPersonAdd size="24px" />
            <Link onClick={() => setMenuIsActive(false)} to={"/signup"}>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default Navbar;
