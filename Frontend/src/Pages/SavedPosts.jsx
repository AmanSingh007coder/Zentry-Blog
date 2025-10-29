import { useState, useEffect } from 'react';
import { fetchSavedPosts } from '../api';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';

const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchSavedPosts();
        data.sort((a, b) => new Date(b.datecreated) - new Date(a.datecreated));
        setSavedPosts(data);
      } catch (error) {
        console.error("Failed to load saved posts", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="space-y-12 mt-24">

      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-orange-500">Your Reading List</h1>
        <p className="mt-2 text-lg text-purple-600">
          Articles you've saved to read later.
        </p>
      </div>
      
   
      <div>
        {isLoading ? (
          <p className="text-center text-slate-500 py-10">Loading your saved posts...</p>
        ) : savedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {savedPosts.map(post => <BlogCard post={post} key={post._id} theme = 'red' />)}
          </div>
        ) : (

          <div className="text-center py-16 px-8 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h3 className="mt-4 text-2xl font-serif font-bold text-slate-800">Your reading list is empty.</h3>
            <p className="mt-2 text-slate-500">
              Click the bookmark icon on any post to save it for later.
            </p>
            <Link to="/home" className="mt-6 inline-block bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Discover Articles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPosts;