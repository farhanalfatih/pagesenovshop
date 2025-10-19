import React, { useState, useEffect, useRef } from "react";

// === Meteors Component ===
export function Meteors({ count = 6, intensity = 0.25 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const meteorsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const createMeteor = () => {
      const startX = Math.random() * window.innerWidth;
      const startY = -20 - Math.random() * 200;
      const len = 80 + Math.random() * 180;
      const speed = 2 + Math.random() * 8;
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      return {
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len,
        life: 0,
        ttl: 40 + Math.random() * 60,
        alpha: 0,
      };
    };
    meteorsRef.current = Array.from({
      length: Math.max(1, Math.round(count)),
    }).map(() => createMeteor());
  }, [count]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const animate = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < meteorsRef.current.length; i++) {
        const m = meteorsRef.current[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life += 1;

        const half = m.ttl * 0.2;
        if (m.life < half) m.alpha = Math.min(1, m.life / half);
        else m.alpha = Math.max(0, 1 - (m.life - half) / (m.ttl - half));

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(
          m.x - m.vx * (m.len / (m.vx || 1)),
          m.y - m.vy * (m.len / (m.vy || 1))
        );
        const grad = ctx.createLinearGradient(
          m.x,
          m.y,
          m.x - m.vx * (m.len / (m.vx || 1)),
          m.y - m.vy * (m.len / (m.vy || 1))
        );
        grad.addColorStop(0, `rgba(255,255,255,${0.9 * m.alpha})`);
        grad.addColorStop(0.6, `rgba(180,150,255,${0.5 * m.alpha})`);
        grad.addColorStop(1, `rgba(120,90,200,${0.05 * m.alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${0.9 * m.alpha})`;
        ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2);
        ctx.fill();

        if (m.life > m.ttl || m.x > w + 200 || m.y > h + 200) {
          if (Math.random() < intensity) {
            meteorsRef.current[i] = {
              ...meteorsRef.current[i],
              x: Math.random() * w,
              y: -10 - Math.random() * 200,
              len: 80 + Math.random() * 160,
              vx:
                Math.cos(Math.PI / 4 + (Math.random() - 0.5) * 0.3) *
                (2 + Math.random() * 8),
              vy:
                Math.sin(Math.PI / 4 + (Math.random() - 0.5) * 0.3) *
                (2 + Math.random() * 8),
              life: 0,
              ttl: 40 + Math.random() * 60,
              alpha: 0,
            };
          } else {
            meteorsRef.current[i].x = Math.random() * w;
            meteorsRef.current[i].y = -400 - Math.random() * 800;
            meteorsRef.current[i].life = 0;
            meteorsRef.current[i].ttl = 40 + Math.random() * 120;
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-0"
      aria-hidden
    />
  );
}

// === Main App ===
export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("hero");

  const categories = ["Minecraft", "Skin", "Produk Lain", "Server", "Plugin"];
  const products = [
    {
      img: "https://placehold.co/300x200",
      judul: "Minecraft Java Edition",
      kategori: "Game",
      harga: "Rp 119.000",
    },
    {
      img: "https://placehold.co/300x200",
      judul: "Minecraft Realms 30 Hari",
      kategori: "Realms",
      harga: "Rp 49.000",
    },
    {
      img: "https://placehold.co/300x200",
      judul: "Plugin EssentialsX Premium",
      kategori: "Plugin",
      harga: "Rp 25.000",
    },
    {
      img: "https://placehold.co/300x200",
      judul: "Server Minecraft 2GB Private",
      kategori: "Server",
      harga: "Rp 70.000",
    },
  ];

  // Filter hanya produk, bukan kategori
  const filteredProducts = products.filter(
    (p) =>
      p.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const heroRef = useRef(null);
  const kategoriRef = useRef(null);
  const produkRef = useRef(null);
  const footerRef = useRef(null);

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
    <div className="min-h-screen relative overflow-hidden flex">
      <div className="absolute inset-0 bg-gradient-to-bl from-purple-900 via-purple-700 to-black -z-10" />
      <Meteors count={8} intensity={0.35} />

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

      {/* === Page Content === */}
      <div className="flex-1 z-10">
        {/* === HERO === */}
        <section
          id="hero"
          ref={heroRef}
          className="pt-32 text-white flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-10"
        >
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
          <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center items-center">
            {" "}
            <div className="flex flex-wrap justify-center items-center gap-6 text-4xl text-white md:grid md:grid-cols-2 md:gap-8">
              {" "}
              <a
                href="#"
                className="hover:scale-125 hover:text-[#69C9D0] transition-transform duration-300 flex justify-center items-center"
              >
                {" "}
                <i className="ri-tiktok-fill" />{" "}
              </a>{" "}
              <a
                href="#"
                className="hover:scale-125 hover:text-pink-400 transition-transform duration-300 flex justify-center items-center"
              >
                {" "}
                <i className="ri-instagram-fill" />{" "}
              </a>{" "}
              <a
                href="#"
                className="hover:scale-125 hover:text-red-500 transition-transform duration-300 flex justify-center items-center"
              >
                {" "}
                <i className="ri-youtube-fill" />{" "}
              </a>{" "}
              <a
                href="#"
                className="hover:scale-125 hover:text-gray-300 transition-transform duration-300 flex justify-center items-center"
              >
                {" "}
                <i className="ri-twitter-x-fill" />{" "}
              </a>{" "}
            </div>{" "}
          </div>
        </section>

        {/* === KATEGORI === */}
        <section
          id="kategori"
          ref={kategoriRef}
          className="mt-20 pb-20 text-white px-6 md:px-10 max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white/10 hover:bg-white/20 cursor-pointer transition-all duration-300 rounded-xl py-3 text-center font-semibold"
              >
                {category}
              </div>
            ))}
          </div>
        </section>

        {/* === PRODUK === */}
        <section
          id="produk"
          ref={produkRef}
          className="pb-20 mt-[-60px] text-white px-6 md:px-10 max-w-6xl mx-auto"
        >
          {/* input cari produk */}
          <div className="relative w-full max-w-sm mb-10 mt-5">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-5 rounded-full bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
            />
            <i className="ri-search-line absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => (
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
                      <h3 className="font-semibold text-lg line-clamp-2 h-12 leading-snug">
                        {item.judul}
                      </h3>
                      <p className="text-sm text-gray-300 mb-2">
                        {item.kategori}
                      </p>
                      <p className="text-purple-400 font-bold">{item.harga}</p>
                      <div className="flex gap-2 mt-3">
                        <img
                          src={item.img}
                          alt="preview 1"
                          className="w-20 h-12 rounded-lg object-cover border border-purple-400 hover:scale-105 transition-transform"
                        />
                        <img
                          src={item.img}
                          alt="preview 2"
                          className="w-20 h-12 rounded-lg object-cover border border-purple-400 hover:scale-105 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic col-span-full">
                Tidak ada produk yang cocok 😅
              </p>
            )}
          </div>
        </section>

        {/* === FOOTER === */}
        <section id="footer" ref={footerRef}>
          <div className="p-10 text-center text-gray-300">© 2025 SenovShop</div>
        </section>
      </div>
    </div>
  );
}
