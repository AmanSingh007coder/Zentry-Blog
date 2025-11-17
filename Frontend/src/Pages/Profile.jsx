import { useState, useEffect, useRef } from 'react';
import { fetchMyPosts, deleteOnePost, uploadAvatar, fetchOneUser } from '../api';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const token = sessionStorage.getItem("User");
        if (token) {
          const decodedToken = jwt_decode.jwtDecode(token);

          const [freshUserData, postsData] = await Promise.all([
            fetchOneUser(decodedToken._id),
            fetchMyPosts()
          ]);

          setUser(freshUserData);
          postsData.sort((a, b) => new Date(b.datecreated) - new Date(a.datecreated));
          setMyPosts(postsData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProfileData();
  }, []);

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const { user: updatedUser } = await uploadAvatar(file);
      setUser(updatedUser);
    } catch (error) {
      alert("Avatar upload failed. Please try again.");
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post forever?")) return;

    try {
      await deleteOnePost(postId);
      setMyPosts((posts) => posts.filter((p) => p._id !== postId));
    } catch (error) {
      alert("Failed to delete post.");
    }
  };

  const getInitials = (name) => {
        if (!name) return '';
        const parts = name.split(' ');
        if (parts.length > 1)
          return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        return name.substring(0, 2).toUpperCase();
      };

  if (isLoading)
    return <p className="text-center text-slate-400 mt-24">Loading your profile...</p>;

  if (!user)
    return <p className="text-center text-slate-400 mt-24">Unable to load user details.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0B13] via-[#111628] to-[#151B2E] text-white px-6 pt-28 pb-20 space-y-16">

{/* PROFILE CARD */}
<div className="bg-white/5 backdrop-blur-md border border-slate-700 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-10 shadow-xl">

  <input
    type="file"
    ref={fileInputRef}
    onChange={handleAvatarUpload}
    accept="image/png, image/jpeg"
    className="hidden"
  />

  {/* Avatar & Change Photo Text Container */}
  <div className="flex flex-col items-center"> {/* New container for centering */}
    <div
      className="cursor-pointer group relative"
      onClick={() => fileInputRef.current.click()}
    >
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-28 h-28 rounded-full object-cover border border-cyan-400 shadow-lg"
        />
      ) : (
        <div className="w-28 h-28 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-3xl font-bold flex items-center justify-center shadow-lg">
          {getInitials(user.name)}
        </div>
      )}
    </div>
    
    {/* Always visible "Change Photo" label, now correctly centered below */}
    <p className="mt-2 text-xs text-cyan-300 cursor-pointer" onClick={() => fileInputRef.current.click()}>
      Change Photo
    </p>
  </div>


  {/* User Info */}
  <div className="w-full sm:w-auto text-center sm:text-left">
    <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
      {user.name}
    </h1>
    <p className="text-slate-300 mt-1">{user.email}</p>
  </div>

</div>

      {/* POSTS SECTION */}
      <div>
        <h2 className="text-3xl font-bold font-serif mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent px-2">
          Your Published Posts
        </h2>

        {myPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {myPosts.map((post) => (
              <BlogCard
                key={post._id}
                post={post}
                showActions={true}
                onDelete={handleDelete}
                theme="cyan"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-8 bg-white/5 border border-slate-700 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold">No Posts Yet</h3>
            <p className="mt-2 text-slate-400">Start writing and share your ideas with the world.</p>
            <Link
              to="/create-blog"
              className="mt-6 inline-block bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-2 rounded-md text-white font-semibold shadow-md hover:opacity-90 transition"
            >
              Create a Post
            </Link>
          </div>
        )}
      </div>

      {/* CTA SECTION */}
      <div className="text-center border-t border-slate-700 pt-12">
        <h2 className="text-3xl font-serif font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Ready to Share Your Voice?
        </h2>
        <p className="mt-2 text-slate-400">Publish your next article easily.</p>
        <Link
          to="/create-blog"
          className="mt-6 inline-block bg-gradient-to-r from-cyan-500 to-blue-500 px-10 py-3 rounded-lg text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          Create a Post
        </Link>
      </div>
    </div>
  );
};

export default Profile;
