import React, { useContext } from "react";
import Wishlist from "../Icons/Wishlist";
import Cart from "../Icons/Cart";
import SearchBar from "./SearchBar";
import { ThemeContext } from "../Store/ThemeProvider";
import { Link } from "react-router-dom";
import UseWishlistAndCartCount from "../CustomHooks/UseWishlistAndCartCount";

const Navbar = ({ hideSearchBar = false }) => {
    const { cartDataCount, wishlistCount } = UseWishlistAndCartCount();
    const { theme, setTheme } = useContext(ThemeContext);
    const dark = "bg-black";
    const light = "bg-blue-400";

    return (
        <div>
            <div
                className={`border h-16 font-bold w-full px-4 items-center border-blue-400 ${
                    theme === "light" ? light : dark
                } flex justify-around shadow-[0px_2px_5px_-1px_rgba(50,50,93,0.25),0px_1px_3px_-1px_rgba(0,0,0,0.3)]`}
            >
                <Link to="/">
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-violet-800 font-extrabold cursor-pointer">
                        SHOPSY
                    </p>
                </Link>

                {!hideSearchBar && <SearchBar />}

                {/* Wishlist & Cart Links */}
                <div className="flex items-center gap-6 text-base text-white font-sans">
                    <Link
                        to="/wishlist"
                        className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
                    >
                        <div className="relative inline-flex items-center">
                            <Wishlist width="25px" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2.5 bg-red-500 text-white text-[11px] font-bold h-5 min-w-5 px-1 rounded-full flex items-center justify-center shadow-sm">
                                    {wishlistCount}
                                </span>
                            )}
                        </div>
                        <span className="hidden sm:inline">Wishlist</span>
                    </Link>

                    <Link
                        to="/cart"
                        className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
                    >
                        <div className="relative inline-flex items-center">
                            <Cart width="25px" />
                            {cartDataCount > 0 && (
                                <span className="absolute -top-2 -right-2.5 bg-red-500 text-white text-[11px] font-bold h-5 min-w-5 px-1 rounded-full flex items-center justify-center shadow-sm">
                                    {cartDataCount}
                                </span>
                            )}
                        </div>
                        <span className="hidden sm:inline">Cart</span>
                    </Link>
                </div>

                {/* Theme Toggle */}
                <label
                    className={`toggle text-base-content ${
                        theme === "light" ? "bg-yellow-100" : "bg-gray-700"
                    }`}
                >
                    <input
                        type="checkbox"
                        value="synthwave"
                        className="theme-controller"
                        checked={theme === "dark"}
                        onChange={() =>
                            theme === "light" ? setTheme("dark") : setTheme("light")
                        }
                    />

                    <svg
                        aria-label="sun"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M12 2v2"></path>
                            <path d="M12 20v2"></path>
                            <path d="m4.93 4.93 1.41 1.41"></path>
                            <path d="m17.66 17.66 1.41 1.41"></path>
                            <path d="M2 12h2"></path>
                            <path d="M20 12h2"></path>
                            <path d="m6.34 17.66-1.41 1.41"></path>
                            <path d="m19.07 4.93-1.41 1.41"></path>
                        </g>
                    </svg>

                    <svg
                        aria-label="moon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        </g>
                    </svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;