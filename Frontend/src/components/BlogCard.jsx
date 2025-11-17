import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useSavedPosts } from "../context/SavedPostsContext";
import { toggleSavePost } from "../api";
import { useState } from "react";

const AuthorInfo = ({ author, date }) => {
  const getInitials = (name) => {
    if (!name) return '...';
    const names = name.split(' ');
    if (names.length > 1) return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex items-center space-x-3">
      {author?.avatarUrl ? (
        <img src={author.avatarUrl} alt={author.name} className="w-8 h-8 rounded-full object-cover" />
      ) : (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300 text-xs">
          {getInitials(author?.name)}
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-white">{author?.name || 'Anonymous'}</p>
        <p className="text-xs text-slate-400">{date}</p>
      </div>
    </div>
  );
};

const BlogCard = ({ post, theme = "cyan", showActions = false, onDelete }) => {
  const { isPostSaved, toggleSave } = useSavedPosts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSaved = isPostSaved(post._id);

  const themes = {
    cyan: {
      glow: "from-cyan-400 to-blue-500",
      shadow: "hover:shadow-[0_0_25px_2px_rgba(34,211,238,0.2)]",
      text: "group-hover:text-cyan-400",
      active: "text-cyan-400"
    }
  };

  const selectedTheme = themes[theme] || themes.cyan;

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSavePost(post._id).then(() => toggleSave(post._id));
  };

  const stringDate = new Date(post.datecreated).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`
        group 
        bg-[#0F1525]/70 
        backdrop-blur-md 
        border border-slate-700/40 
        rounded-2xl 
        overflow-hidden 
        transition-all 
        shadow-lg shadow-cyan-500/5 
        ${selectedTheme.shadow}
        h-[430px]          /* <<< FIXED CARD HEIGHT */
        flex flex-col
      `}
    >
      <Link to={`/read-blog/${post._id}`} className="flex flex-col h-full">

        {/* --- FIXED IMAGE HEIGHT --- */}
        <div className="relative overflow-hidden h-48">
          <img
            src={post.imageUrl || "https://placehold.co/600x400/0C0F1A/white?text=No+Image"}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${selectedTheme.glow} opacity-10 group-hover:opacity-20 transition`}
          />
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="p-5 flex flex-col flex-grow">

          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${selectedTheme.glow} text-white mb-3 self-start`}
          >
            {post.category || "General"}
          </span>

          <div className="flex-grow">
            <h2 className={`text-lg font-bold font-serif text-white mb-1 ${selectedTheme.text} transition line-clamp-2`}>
              {post.title}
            </h2>

            {/* --- FIXED DESCRIPTION HEIGHT --- */}
            <p className="text-slate-400 text-sm line-clamp-2">
              {post.description}
            </p>
          </div>

          {/* --- FOOTER ALWAYS AT BOTTOM --- */}
          <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between text-slate-500 text-xs">
            <AuthorInfo author={post.author} date={stringDate} />

            <div className="flex items-center space-x-1">
              <button
                onClick={handleSaveClick}
                className={`p-2 rounded-full transition ${
                  isSaved ? selectedTheme.active : "text-slate-400 hover:text-white"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>

              {showActions && (
                <div className="relative">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} 
                    className="p-2 rounded-full text-slate-400 hover:text-white"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
                    </svg>
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-md shadow-lg z-30">
                      <div className="py-1">
                        <Link to={`/edit-post/${post._id}`} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                          Edit Post
                        </Link>
                        <button
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(post._id); }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                        >
                          Delete Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
