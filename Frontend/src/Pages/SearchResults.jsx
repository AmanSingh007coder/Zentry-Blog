import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchPosts } from '../api';
import BlogCard from '../components/BlogCard';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      const performSearch = async () => {
        setIsLoading(true);
        try {
          const data = await searchPosts(query);
          setResults(data);
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsLoading(false);
        }
      };
      performSearch();
    }
  }, [query]);

  return (
    <div className="space-y-10 mt-24">
      
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold font-serif text-purple-700">
        Search Results for: 
        <span className="text-orange-500"> "{query}"</span>
      </h1>

      {/* Loader */}
      {isLoading ? (
        <p className="text-slate-500 text-lg">Searching...</p>
      ) : results.length > 0 ? (
        
        // Matching homepage grid
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {results.map(post => (
            <BlogCard post={post} key={post._id} />
          ))}
        </div>

      ) : (
        <p className="text-slate-500 text-lg">
          No posts found matching your search.
        </p>
      )}
    </div>
  );
};

export default SearchResults;
