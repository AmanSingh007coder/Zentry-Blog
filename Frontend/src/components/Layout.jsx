import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Layout = () => {
  const user = sessionStorage.getItem("User");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0A0B13] via-[#111628] to-[#151B2E] text-white">
      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow w-full mx-auto px-3 sm:px-6 lg:px-10 pt-24 pb-12">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
