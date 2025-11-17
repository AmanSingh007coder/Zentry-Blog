import { useState } from "react";
import { verifyUser } from "../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const Login = ({ setView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3004";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const response = await verifyUser(user);
    if (response) {
      sessionStorage.setItem("User", response);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response}`;
      navigate("/home");
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const response = await axios.post(`${URL}/users/google-auth`, {
        token: idToken,
      });

      const myAppToken = response.data.token;
      if (myAppToken) {
        sessionStorage.setItem("User", myAppToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${myAppToken}`;
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="space-y-6 text-white">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          Welcome Back
        </h2>
        <p className="mt-2 text-slate-400 text-sm">
          Sign in to continue your journey.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            required
            maxLength={40}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-4 py-3 bg-[#111827] border border-cyan-800/40 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            required
            maxLength={12}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-[#111827] border border-cyan-800/40 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold rounded-lg text-white shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 transition"
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-cyan-900/40" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-[#0C0F1A] px-3 text-slate-400">OR</span>
        </div>
      </div>

      {/* Google Sign-in */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center py-3 px-4 border border-cyan-700/50 bg-[#111827]/60 rounded-lg shadow-md hover:bg-cyan-500/10 text-slate-200 transition"
      >
        <FcGoogle className="w-5 h-5 mr-3" />
        Continue with Google
      </button>

      {/* Switch to Signup */}
      <p className="text-center text-sm text-slate-400">
        Don’t have an account?{" "}
        <span
          onClick={() => setView("signup")}
          className="font-semibold text-cyan-400 hover:text-blue-400 cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
