import React, { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";
import Blog from "../assets/Blog.png"
const Header = () => {
    const [openNav, setOpenNav] = useState(false);
    const handleNav = () => {
        setOpenNav(!openNav);
    };

        const NavLinks = [
            { path: "/", pathName: "Food" },
            { path: "/product", pathName: "Product review" }
        ];

    return (
        <div className="sticky top-0 w-full bg-white shadow-md z-50  " id="home">
            <div className="flex justify-between text-black p-2">
                 <img src={Blog} alt=""  className="size-[50px]" />
                <div className="hidden md:flex space-x-4">
                    {NavLinks.map(({ path, pathName }, index) => (
                        <a
                            href={path}
                            key={index}
                           className="p-2 m-2 text-black hidden md:inline  text-xl font-normal capitalize"
                        >
                            {pathName}
                        </a>
                    ))}
                </div>
                {/* <ToggleButton /> */}
                <button className="md:hidden" onClick={handleNav}>
                       <FaBars className="text-2xl" />
                </button>
            </div>

            {/* Mobile Navigation (absolute overlay) */}
            <div
                className={`md:hidden fixed top-0 left-0 w-full h-screen bg-black/50 ${
                    openNav ? "block" : "hidden"
                }`}
                onClick={handleNav}
            ></div>
            <div
                className={`md:hidden fixed top-0 left-0 h-screen bg-white shadow-md w-3/4 max-w-xs transform ${
                    openNav ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out`}
            >
                <button className="absolute top-5 right-5" onClick={handleNav}>
                    <FaTimes className="text-2xl" />
                </button>
                <div className="flex flex-col items-center pt-20">
                    {NavLinks.map(({ path, pathName }, index) => (
                        <a
                            href={path}
                            key={index}
                            className="className='p-2 m-2 text-black  text-center  text-xl font-normal capitalize block md:hidden"
                        >
                            {pathName}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;
