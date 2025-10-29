import { useState, useEffect } from 'react';
import { fetchAllPosts } from '../api';
import BlogCard from '../components/BlogCard';
import { useNavigate } from 'react-router-dom';
import CategoryRow from '../components/CategoryRow';


const categoriesToShow = ['Technology', 'Travel', 'Lifestyle', 'Food', 'News', 'Cricket'];

const Homepage = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [regularPosts, setRegularPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const allPosts = await fetchAllPosts();
        const featured = allPosts.filter(post => post.isFeatured);
        const regular = allPosts.filter(post => !post.isFeatured);
        featured.sort((a, b) => new Date(b.datecreated) - new Date(a.datecreated));
        setFeaturedPosts(featured);
        setRegularPosts(regular);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="mt-20">
      

      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto space-y-12">
          

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold font-serif bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Discover Articles
            </h1>
            <p className="mt-2 text-lg text-purple-700">
              Insights and stories on topics you love.
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative">
              <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for articles..." className="w-full px-6 py-3.5 border-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-400 text-white rounded-full px-8 py-2 font-medium hover:bg-orange-500 transition-colors">
                Search
              </button>
            </div>
          </form>

          {isLoading && <p className="text-center text-slate-500">Loading content...</p>}


          {!isLoading && featuredPosts.length > 0 && (
            <div>
              <h3 className="text-3xl font-bold font-serif bg-gradient-to-r from-purple-800 to-orange-500 bg-clip-text text-transparent mb-8">
                Featured Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post) => (
                  <BlogCard post={post} key={post._id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <hr className='border-t border-gray-300' />


      {!isLoading && regularPosts.length > 0 && (
        <section className="bg-slate-50 py-5">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {categoriesToShow.map(category => (
              <CategoryRow
                key={category}
                title={category}
                posts={regularPosts.filter(post => post.category === category)}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default Homepage;