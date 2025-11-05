import { useState } from 'react';
import { verifyUser } from '../api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase';
import { FcGoogle } from "react-icons/fc";

const Login = ({ setView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ADD THIS - Get the API URL
  const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3004";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const response = await verifyUser(user);
    if (response) {
      sessionStorage.setItem("User", response);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response}`;
      navigate('/home');
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
      
      // CHANGED THIS LINE - Use the URL variable instead of hardcoded localhost
      const response = await axios.post(`${URL}/users/google-auth`, { token: idToken });
      
      const myAppToken = response.data.token;
      if (myAppToken) {
        sessionStorage.setItem("User", myAppToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${myAppToken}`;
        navigate('/home');
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-serif">Welcome Back</h2>
        <p className="mt-2 text-sm text-slate-500">Sign in to continue.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><input type="email" name="email" required maxLength={40} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/></div>
        <div><input type="password" name="password" required maxLength={12} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/></div>
        <button type="submit" className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-purple-700 shadow-md text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors cursor-pointer">Sign In</button>
      </form>
      <div className="relative my-4"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div><div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">OR</span></div></div>
      <button type="button" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center py-2 px-4 border border-orange-500 rounded-md shadow-sm bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
        <FcGoogle className="w-5 h-5 mr-3" />
        Sign In with Google
      </button>
      <p className="text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <span onClick={() => setView('signup')} className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer">Sign Up</span>
      </p>
    </div>
  );
};

export default Login;