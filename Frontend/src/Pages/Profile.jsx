import { useState, useEffect, useRef } from 'react';
import { fetchMyPosts, deleteOnePost, uploadAvatar, fetchOneUser } from '../api';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';

const Profile = () => {
  // --- All of your existing logic is unchanged ---
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
        } else {
          setIsLoading(false);
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
    if (file) {
      try {
        const { user: updatedUser } = await uploadAvatar(file);
        setUser(updatedUser);
      } catch (error) {
        alert("Avatar upload failed. Please try again.");
      }
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post forever?")) {
      try {
        await deleteOnePost(postId);
        setMyPosts(currentPosts => currentPosts.filter(post => post._id !== postId));
      } catch (error) {
        alert("Failed to delete post.");
      }
    }
  };

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1) return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  if (isLoading) {
    return <div className="text-center text-slate-500 py-10 mt-24">Loading your profile...</div>;
  }
  
  if (!user) {
    return <div className="text-center text-slate-500 py-10 mt-24">Could not load user details. Please log in again.</div>;
  }

  return (
    <div className="space-y-12 mt-24">
      {/* Profile Header Card */}
      <div className="bg-white rounded-xl shadow-md p-8 flex flex-col sm:flex-row items-center gap-8">
        
        {/* --- REDESIGNED AVATAR SECTION --- */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleAvatarUpload}
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
          />
          {/* The avatar itself */}
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full object-cover shadow-md" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-white text-4xl font-bold font-serif">{getInitials(user.name)}</div>
          )}
          {/* The button below the avatar */}
          <button 
            onClick={() => fileInputRef.current.click()} 
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Change Photo
          </button>
        </div>

        {/* User Info Section */}
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold font-serif text-purple-900">{user.name}</h1>
          <p className="text-orange-500 text-lg mt-1">{user.email}</p>
        </div>
      </div>

      {/* Published Posts Section */}
      <div>
        <h2 className="md:text-3xl text-xl font-bold font-serif mb-8 px-5 bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
          Your Published Posts
        </h2>
        {myPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {myPosts.map(post => (
              <BlogCard 
                key={post._id} 
                post={post}
                showActions={true}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-8 bg-white rounded-xl shadow-md">
            <h3 className="text-2xl font-serif font-bold text-slate-800">No Posts Yet</h3>
            <p className="mt-2 text-slate-500">It's time to share your first story with the world!</p>
            <Link to="/create-blog" className="mt-6 inline-block bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Create a Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;