import { useState, useEffect } from "react";
import { fetchAllPosts } from "../api";
import BlogCard from "../components/BlogCard";
import CategoryRow from "../components/CategoryRow";

const categoriesToShow = ["Technology", "Travel", "Lifestyle", "Food", "News", "Cricket"];
const categoryThemes = {
  Technology: "cyan",
  Travel: "blue",
  Lifestyle: "purple",
  Food: "pink",
  News: "indigo",
  Cricket: "teal",
};

const Homepage = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [regularPosts, setRegularPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const allPosts = await fetchAllPosts();
        const featured = allPosts.filter((post) => post.isFeatured);
        const regular = allPosts.filter((post) => !post.isFeatured);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0B13] via-[#111628] to-[#151B2E] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
            Explore Inspiring Stories
          </h1>
          <p className="mt-3 text-slate-400 text-sm md:text-base">
            Dive into the latest from creators, innovators, and thinkers.
          </p>
        </div>

        {isLoading && (
          <p className="text-center text-slate-500 animate-pulse">Loading content...</p>
        )}

        {/* Featured Section */}
        {!isLoading && featuredPosts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Featured Articles
            </h2>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <BlogCard key={post._id} post={post} theme="cyan" />
              ))}
            </div>
          </section>
        )}

        {/* Category Rows */}
        {!isLoading && regularPosts.length > 0 && (
          <div className="space-y-20">
            {categoriesToShow.map((category) => (
              <CategoryRow
                key={category}
                title={category}
                posts={regularPosts.filter((post) => post.category === category)}
                theme={categoryThemes[category] || "cyan"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
