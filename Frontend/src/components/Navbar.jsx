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
    <header 
      className="fixed z-50 w-full top-0 p-4 transition-all duration-300
                 md:w-5xl md:top-1 md:left-1/2 md:-translate-x-1/2"
    >
      <nav 
        className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-800 
                   text-white rounded-full shadow-xl md:px-6 md:py-4 px-4 py-3.5 backdrop-blur-md bg-opacity-90"
      >
        

        <Link to="/home" className="text-2xl font-extrabold font-serif">
        Zentry.in
        </Link>
        
 
        <div className="hidden md:flex items-center space-x-8 text-md mx-8">
          {pageData.map((data) => (
            <Link
              key={data.name}
              to={data.path}
              className="hover:text-orange-500 transition-colors"
            >
              {data.name}
            </Link>
          ))}
        </div>


        <div className="flex items-center space-x-4">

          <div className="hidden md:flex">
            <button
              onClick={handlelogout}
              className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition-colors"
            >
              Log Out
            </button>
          </div>


          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-100 text-slate-800 rounded-lg shadow-lg mt-2">
          <ul className="flex flex-col items-center space-y-4 py-4">
            {pageData.map((data) => (
              <li key={data.name}>
                <Link 
                  to={data.path} 
                  onClick={() => setIsMenuOpen(false)} 
                  className="hover:text-orange-600"
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
                className="bg-indigo-600 text-white px-7 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700"
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