import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("hero");

  const categories = ["Minecraft", "Skin", "Produk Lain", "Server", "Plugin"];
  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const heroRef = useRef(null);
  const kategoriRef = useRef(null);
  const produkRef = useRef(null);
  const footerRef = useRef(null);

  // === Scroll Section Aktif ===
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "hero", ref: heroRef },
        { id: "kategori", ref: kategoriRef },
        { id: "produk", ref: produkRef },
        { id: "footer", ref: footerRef },
      ];

      const current = sections.find(
        (section) =>
          section.ref.current &&
          window.scrollY >= section.ref.current.offsetTop - 200 &&
          window.scrollY <
            section.ref.current.offsetTop +
              section.ref.current.offsetHeight -
              200
      );

      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-purple-700 to-black relative overflow-hidden flex">
      {/* === Navigasi kiri === */}
      <div className="hidden md:flex flex-col fixed top-1/2 left-6 -translate-y-1/2 space-y-4 z-50">
        {[
          { id: "hero", label: "Hero", ref: heroRef },
          { id: "kategori", label: "Kategori", ref: kategoriRef },
          { id: "produk", label: "Produk", ref: produkRef },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.ref)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === item.id
                ? "bg-purple-400 scale-125"
                : "bg-gray-500 hover:bg-purple-400"
            }`}
          />
        ))}
      </div>

      <div className="flex-1">
        {/* <Navbar /> */}

        {/* === HERO === */}
        <section
          id="hero"
          ref={heroRef}
          className="pt-32 text-white flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-10"
        >
          {/* === KIRI === */}
          <div className="flex flex-col items-start md:w-1/2 space-y-6 pl-0 md:pl-24">
            <div className="flex items-center space-x-6">
              <img
                src="https://placehold.co/120x120"
                alt="Logo Senovshop"
                className="rounded-xl shadow-lg border border-purple-500"
              />
              <div>
                <h1 className="text-4xl font-extrabold text-white drop-shadow-lg tracking-tight">
                  SENOV<span className="text-purple-400">SHOP</span>
                </h1>
                <p className="text-gray-300 text-lg">
                  Toko Minecraft Ori, Realms, Mcjava Termurah!
                </p>
              </div>
            </div>
          </div>

          {/* === KANAN (SOCIAL ICONS) === */}
          <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center items-center">
            <div
              className="
              flex flex-wrap justify-center items-center gap-6 text-4xl text-white
              md:grid md:grid-cols-2 md:gap-8
            "
            >
              <a
                href="#"
                className="hover:scale-125 hover:text-[#69C9D0] transition-transform duration-300 flex justify-center items-center"
              >
                <i className="ri-tiktok-fill"></i>
              </a>
              <a
                href="#"
                className="hover:scale-125 hover:text-pink-400 transition-transform duration-300 flex justify-center items-center"
              >
                <i className="ri-instagram-fill"></i>
              </a>
              <a
                href="#"
                className="hover:scale-125 hover:text-red-500 transition-transform duration-300 flex justify-center items-center"
              >
                <i className="ri-youtube-fill"></i>
              </a>
              <a
                href="#"
                className="hover:scale-125 hover:text-gray-300 transition-transform duration-300 flex justify-center items-center"
              >
                <i className="ri-twitter-x-fill"></i>
              </a>
            </div>
          </div>
        </section>
        <section
          id="kategori"
          ref={kategoriRef}
          className="mt-20 pb-20 text-white px-6 md:px-10 max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white/10 hover:bg-white/20 cursor-pointer transition-all duration-300 rounded-xl py-3 text-center font-semibold"
                >
                  {category}
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic col-span-full">
                Tidak ada kategori yang cocok 😅
              </p>
            )}
          </div>

          <div className="relative w-full max-w-sm mb-10 mt-5">
            <input
              type="text"
              placeholder="Cari produk atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-5 rounded-full bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
            />
            <i className="ri-search-line absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
          </div>
        </section>

        <section
          id="produk"
          ref={produkRef}
          className="pb-20 mt-[-60px] text-white px-6 md:px-10 max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

            {[
              {
                img: "https://placehold.co/300x200",
                judul:
                  "Minecraft Java Edition Super Long Name Example to Test Layout Stability",
                kategori: "Game",
                sellerImg: "https://placehold.co/40x40",
                harga: "Rp 119.000",
              },
              {
                img: "https://placehold.co/300x200",
                judul: "Minecraft Realms 30 Hari",
                kategori: "Realms",
                sellerImg: "https://placehold.co/40x40",
                harga: "Rp 49.000",
              },
              {
                img: "https://placehold.co/300x200",
                judul: "Plugin EssentialsX Premium",
                kategori: "Plugin",
                sellerImg: "https://placehold.co/40x40",
                harga: "Rp 25.000",
              },
              {
                img: "https://placehold.co/300x200",
                judul:
                  "Server Minecraft 2GB Private Custom Config Edition Long Title",
                kategori: "Server",
                sellerImg: "https://placehold.co/40x40",
                harga: "Rp 70.000",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-xl overflow-hidden shadow-lg border border-white/10 flex flex-col"
              >
                <img
                  src={item.img}
                  alt={item.judul}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-ellipsis overflow-hidden line-clamp-2 h-12 leading-snug">
                      {item.judul}
                    </h3>
                    <p className="text-sm text-gray-300 mb-2">
                      {item.kategori}
                    </p>
                    <p className="text-purple-400 font-bold">{item.harga}</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <img
                      src={item.sellerImg}
                      alt="seller"
                      className="w-10 h-10 rounded-2xl border border-purple-400"
                    />
                    <img
                      src={item.sellerImg}
                      alt="seller"
                      className="w-10 h-10 rounded-2xl border border-purple-400"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === FOOTER === */}
        <section id="footer" ref={footerRef}>
          <div className="p-10 text-center text-gray-300">© 2025 SenovShop</div>
        </section>
      </div>
    </div>
  );
};

export default App;
