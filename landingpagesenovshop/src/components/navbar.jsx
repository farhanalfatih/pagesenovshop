import React, { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 5);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Navbar Desktop */}
      <nav
        className={`hidden md:flex mx-auto transition-all duration-300 items-center justify-between rounded-2xl backdrop-blur-xl border border-white/20 relative overflow-hidden
        ${isScrolled ? "mt-2 max-w-6xl px-6 py-2" : "mt-4 max-w-7xl px-8 py-4"}`}
        style={{
          background: "rgba(255,255,255,0.2)",
          boxShadow:
            "0 8px 20px rgba(255, 255, 255, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Efek bayangan lembut putih di bawah */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-80"></div>

        <ul className="flex flex-1 justify-center items-center space-x-8 text-sm font-medium text-white">
          <li>
            <a href="/" className="">
              Beranda
            </a>
          </li>
          <li>
            <a href="/" className=" hover:text-blue-600">
              Product
            </a>
          </li>
          <li>
            <a href="cek-teransaksi" className=" hover:text-blue-600">
              Cek Pembelian
            </a>
          </li>
        </ul>
      </nav>

      {/* Tombol Hamburger (Mobile Only) */}
      <button
        className="md:hidden fixed top-4 right-4 text-gray-800 z-[60] focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i
          className={`text-3xl text-white transition-all duration-300 ${
            isOpen ? "ri-close-line" : "ri-menu-line"
          }`}
        ></i>
      </button>

      {/* Menu Fullscreen Mobile */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white/70 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 text-lg font-medium transition-all duration-500
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <ul className="flex flex-col items-center space-y-6">
          <li>
            <a
              href="/"
              className="text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Beranda
            </a>
          </li>
          <li>
            <a
              href="cek-teransaksi"
              className="text-black hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Cek Pembelian
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
