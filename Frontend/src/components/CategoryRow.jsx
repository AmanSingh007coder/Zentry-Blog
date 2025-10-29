import BlogCard from './BlogCard';

const CategoryRow = ({ title, posts }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
  <section className="space-y-4">
  {/* This wrapper div will center the heading */}
  <div className="text-center">
    <h2 
      className="inline-block bg-gradient-to-r from-blue-400 to-pink-400 p-1 text-white 
                 px-6 py-2 md:px-10 md:py-3 
                 text-lg md:text-3xl 
                 font-extrabold font-serif 
                 rounded-full"
    >
      {title}
    </h2>
  </div>
      
  {/* The rest of your code remains the same */}
  <div className="relative w-full">
    <div className="flex space-x-6 overflow-x-auto pb-4">
      {posts.map(post => (
        <div key={post._id} className="flex-shrink-0 w-80">
          <BlogCard post={post} />
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default CategoryRow;