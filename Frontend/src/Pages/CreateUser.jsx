import { useState } from 'react';
import { createOneUser } from '../api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase';
import { AiOutlineGoogle } from 'react-icons/ai';

const CreateUser = ({ setView }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const useraccountobject = { name, email, password };
    try {
      await createOneUser(useraccountobject);
      alert("User Account Created Successfully!");
      setView('login'); 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unknown error occurred.";
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
      const response = await axios.post('http://localhost:3004/users/google-auth', { token: idToken });
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
        <h2 className="text-3xl font-bold font-serif">Create an Account</h2>
        <p className="mt-2 text-sm text-slate-500">Begin your journey with us.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><input type="text" name="name" required maxLength={35} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/></div>
        <div><input type="email" name="email" required maxLength={50} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/></div>
        <div><input type="password" name="password" required minLength={6} maxLength={12} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min. 6 characters)" className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/></div>
        <button type="submit" className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-purple-700 shadow-md text-white font-semibold rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Create Account</button>
      </form>
      <div className="relative my-4"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300" /></div><div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">OR</span></div></div>
      <button type="button" onClick={handleGoogleSignUp} className="w-full flex items-center justify-center py-2 px-4 border border-orange-500 rounded-md shadow-sm bg-white text-slate-700 hover:bg-slate-50 transition-colors">
        <AiOutlineGoogle className="w-5 h-5 mr-2" />
        Sign Up with Google
      </button>
      <p className="text-center text-sm text-slate-500">
        Already have an account?{' '}
        <span onClick={() => setView('login')} className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer">Sign In</span>
      </p>
    </div>
  );
};

export default CreateUser;