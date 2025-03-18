import React, { useState, useEffect } from "react";
import { Menu, X } from "react-feather";
import Image from "next/image";
import { Big_Shoulders_Stencil_Display } from "next/font/google";

const bgs = Big_Shoulders_Stencil_Display({
  subsets: ["latin"],
  weight: "400",
});
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-black/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo & Brand Name */}
        <div className="flex items-center space-x-3">
          <Image
            src={"/images/logo-mystri.png"}
            alt="Logo"
            width={60}
            height={60}
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
          />
          <h1
            className={`${bgs.className} "text-xl font-bold text-yellow-200 md:text-2xl lg:text-3xl xl:text-4xl hover:font-bold transition-all duration-300 cursor-pointer"`}
          >
            MYSTRI
          </h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg text-white">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`/${item.replace(/\s+/g, "").toLowerCase()}`}
                className="hover:scale-105 hover:font-bold transition-all duration-300"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Partial Screen) */}
      <div
        className={`fixed top-0 left-0 w-full bg-blue-900 text-yellow-100 shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="relative py-6 px-4">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-yellow-100"
            onClick={() => setIsOpen(false)}
          >
            <X size={32} />
          </button>

          {/* Mobile Menu Links */}
          <ul className="space-y-4 text-center text-lg py-8">
            {["Home", "About Us", "Our Services", "Contact Us"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.replace(/\s+/g, "").toLowerCase()}`}
                  className="block hover:scale-105 hover:font-bold transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
