import BlogCard from './BlogCard';

const CategoryRow = ({ title, posts }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-extrabold font-serif text-white bg-gradient-to-r from-blue-400 to-pink-400 p-1 md:mx-120 mx-30 text-center rounded-3xl sm:px-0 my-8">{title}</h2>
      
     
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