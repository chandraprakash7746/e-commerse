import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Wishlist from "../Icons/Wishlist";
import Cart from "../Icons/Cart";
import SearchBar from "./SearchBar";
import { ThemeContext } from "../Store/ThemeProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UseWishlistAndCartCount from "../CustomHooks/UseWishlistAndCartCount";

 
const Navbar = ({ hideSearchBar = false }) => {
    const { cartDataCount, wishlistCount } = UseWishlistAndCartCount();
    const { theme, setTheme } = useContext(ThemeContext);
    const dark = "bg-black";
    const light = "bg-blue-400";
    return (
        <div >
            <div className={`border h-15 font-bold w-full  items-center border-blue-400 ${theme == "light" ? light : dark} flex justify-around shadow-[0px_2px_5px_-1px_rgba(50,50,93,0.25),0px_1px_3px_-1px_rgba(0,0,0,0.3)]`}>


                <Link to='/'>
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-violet-800  font-extrabold cursor-pointer">SHOPSY</p>
                </Link>

                {/* <SearchBar /> */}
                {/* if hideSearchBar is false then !operator makes it true then call <SearchBar /> otherwise not call <SeachBar/> */}
                {!hideSearchBar && <SearchBar />}



                <div className="flex justify-around  w-[20%]  text-base text-white font-sans">
                    <Link to={`/wishlist`} className=" w-[50%] flex gap-1 cursor-pointer border relative"><Wishlist width="25px" />
                        <div>
                            Wishlist
                        </div>
                        {wishlistCount > 0 && <div className="absolute right-10 bottom-2 text-black">{wishlistCount }</div>}
                    </Link>
                    <Link to={'/cart'} className=" w-[50%] flex gap-1 cursor-pointer relative"><Cart width="25px" /> 
                    <div>Cart</div>
                   {cartDataCount > 0 &&  <div className="text-black absolute right-10 bottom-2">{cartDataCount}</div>}
                    </Link>
                </div>

                <label className={`toggle text-base-content ${theme === "light" ? "bg-yellow-100" : "bg-gray-700"}`}>
                    <input type="checkbox" value="synthwave" className="theme-controller" checked={theme === "dark"} onChange={() => theme == "light" ? setTheme("dark") : setTheme("light")} />

                    <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

                    <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

                </label>

            </div>

        </div>
    )
}
export default Navbar;




