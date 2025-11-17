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
    <div className="mt-24 space-y-14">

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-orange-400">
          Saved Posts
        </h1>
        <p className="mt-2 text-base md:text-lg text-slate-500">
          Your collection of bookmarked articles
        </p>
      </div>


      {/* LIST OR EMPTY STATE */}
      <div>
        {isLoading ? (
          <p className="text-center text-slate-500 py-10 animate-pulse">
            Loading your saved posts...
          </p>
        ) : savedPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {savedPosts.map(post => (
              <BlogCard post={post} key={post._id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-8 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-md max-w-2xl mx-auto border border-slate-200 dark:border-slate-700">
            
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 text-slate-400 dark:text-slate-500"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>

            <h3 className="mt-4 text-2xl font-serif font-bold text-slate-700 dark:text-slate-100">
              Your reading list is empty
            </h3>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Bookmark some articles to see them here.
            </p>

            <Link
              to="/home"
              className="mt-6 inline-block bg-orange-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Browse Articles
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default SavedPosts;
