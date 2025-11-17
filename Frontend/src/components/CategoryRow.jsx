import BlogCard from "./BlogCard";
import { motion } from "framer-motion";

const CategoryRow = ({ title, posts, theme = "cyan" }) => {
  if (!posts || posts.length === 0) return null;

  const themeGradient = {
    cyan: "from-cyan-400 to-blue-500",
    purple: "from-purple-400 to-pink-500",
    blue: "from-sky-400 to-indigo-500",
    pink: "from-pink-400 to-fuchsia-500",
    teal: "from-teal-400 to-cyan-500",
    indigo: "from-indigo-400 to-blue-600",
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2
          className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${
            themeGradient[theme]
          } text-2xl md:text-3xl font-bold font-serif relative`}
        >
          {title}
          <span
            className={`block h-[2px] w-12 mx-auto mt-2 rounded-full bg-gradient-to-r ${themeGradient[theme]}`}
          ></span>
        </h2>
      </div>

      <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
        {posts.map((post) => (
          <div key={post._id} className="flex-shrink-0 w-80">
            <BlogCard post={post} theme={theme} />
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default CategoryRow;
