import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Array Navbar Links
  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
  ];

  // navbar otomatis tertutup
  const handleNavigationOff = () => {
    setIsMenuOpen(false);
  };

  // Screen Lock
  useEffect(() => {
    {
      isMenuOpen
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "auto");
    }
    return () => {
      document.body.style.overflow = "auto";
      
    }
  }, [isMenuOpen]);

  // Style ketika link aktif
  const activeStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-500 border-b-2 border-blue-500 pb-1"
      : "text-white  hover:text-blue-500";
  return (
    <nav className="relative bg-slate-900 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Judul Dashboard */}
        <h1
          className="text-xl md:text-3xl font-bold"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <NavLink to="/">MyProductivity</NavLink>
        </h1>

        {/* List Navigasi */}
        <ul className="hidden md:flex space-x-6 items-center ">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={activeStyle}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Menu Hamburger untuk Mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay */}
      <>
        <div
          className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
            isMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        {/* Menu Mobile */}
        <ul
          className={`absolute left-0 w-full bg-slate-900 z-50 md:hidden flex flex-col gap-4 py-6 transition-all duration-300 ease-in-out${
            isMenuOpen
              ? "top-16 opacity-100"
              : "-top-64 opacity-0 pointer-events-none"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.path} className="w-full">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block w-full px-8 py-4 transition-all
                ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border-l-4 border-blue-500"
                    : "text-white hover:bg-slate-800"
                }
                `
                }
                onClick={handleNavigationOff}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </>
    </nav>
  );
}

