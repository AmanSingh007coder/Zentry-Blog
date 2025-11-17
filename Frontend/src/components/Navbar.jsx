import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from 'react-icons/fi';
import { pageData } from "./pageData";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handlelogout = () => {
    sessionStorage.removeItem("User");
    navigate("/");
  };

  return (
    <header className="fixed z-50 w-full top-0 px-4 py-3 md:px-6 backdrop-blur-xl">
      <nav
        className="
          flex items-center justify-between 
          bg-[#0C0F1A]/80 
          border border-cyan-500/20 
          rounded-2xl 
          shadow-lg shadow-blue-500/10 
          px-5 py-3 md:px-8 md:py-4 
          transition-all
        "
      >
        {/* Brand */}
        <Link 
          to="/home" 
          className="text-2xl font-extrabold font-serif tracking-wide bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          zentry
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {pageData.map((data) => (
            <Link
              key={data.name}
              to={data.path}
              className="text-slate-300 hover:text-cyan-400 transition"
            >
              {data.name}
            </Link>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handlelogout}
            className="hidden md:flex bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md shadow-cyan-500/20 hover:shadow-blue-500/30 transition"
          >
            Log Out
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
            className="md:hidden text-slate-200"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0F1322]/95 backdrop-blur-lg text-white rounded-xl shadow-lg border border-cyan-500/20 mt-2">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {pageData.map((data) => (
              <li key={data.name}>
                <Link
                  to={data.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-300 hover:text-cyan-400 transition"
                >
                  {data.name}
                </Link>
              </li>
            ))}

            <li className="pt-4">
              <button
                onClick={() => {
                  handlelogout();
                  setIsMenuOpen(false);
                }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-7 py-2 rounded-full font-semibold shadow-md shadow-cyan-500/20 hover:shadow-blue-500/30 transition"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
