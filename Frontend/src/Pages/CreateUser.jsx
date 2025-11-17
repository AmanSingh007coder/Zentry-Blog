import { useState } from "react";
import { createOneUser } from "../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const CreateUser = ({ setView }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3004";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const useraccountobject = { name, email, password };
    try {
      await createOneUser(useraccountobject);
      alert("User Account Created Successfully!");
      setView("login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unknown error occurred.";
      console.error("Error creating user:", errorMessage);
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleGoogleSignUp = async () => {
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
          Create an Account
        </h2>
        <p className="mt-2 text-slate-400 text-sm">
          Begin your journey with us.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            required
            maxLength={35}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-[#111827] border border-cyan-800/40 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            required
            maxLength={50}
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
            minLength={6}
            maxLength={12}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min. 6 characters)"
            className="w-full px-4 py-3 bg-[#111827] border border-cyan-800/40 rounded-lg text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold rounded-lg text-white shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 transition"
        >
          Create Account
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

      {/* Google Sign-up */}
      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="w-full flex items-center justify-center py-3 px-4 border border-cyan-700/50 bg-[#111827]/60 rounded-lg shadow-md hover:bg-cyan-500/10 text-slate-200 transition"
      >
        <FcGoogle className="w-5 h-5 mr-3" />
        Continue with Google
      </button>

      {/* Switch to Login */}
      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <span
          onClick={() => setView("login")}
          className="font-semibold text-cyan-400 hover:text-blue-400 cursor-pointer"
        >
          Sign In
        </span>
      </p>
    </div>
  );
};

export default CreateUser;
