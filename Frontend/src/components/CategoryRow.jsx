import BlogCard from './BlogCard';

const CategoryRow = ({ title, posts, theme = 'blue' }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
  <section className="space-y-4">
  <div className="text-center">
    <h2 
      className="inline-block bg-gradient-to-r from-sky-400 to-indigo-400 p-1 text-white 
                 px-6 py-2 md:px-7 md:py-1 
                 text-lg md:text-3xl 
                 font-extrabold font-serif 
                 rounded-full mb-2"
    >
      {title}
    </h2>
  </div>
      
  <div className="relative w-full">
    <div className="flex space-x-6 overflow-x-auto pb-4">
      {posts.map(post => (
        <div key={post._id} className="flex-shrink-0 w-80">
          <BlogCard post={post} theme={theme} />
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default CategoryRow;