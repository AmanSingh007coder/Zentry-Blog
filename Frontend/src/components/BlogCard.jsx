import { Link } from 'react-router-dom';
import { useSavedPosts } from '../context/SavedPostsContext';
import { toggleSavePost } from '../api';
import { useState } from 'react';

// A sub-component for the colorful category tag
const CategoryTag = ({ category }) => (
  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-4">
    {category || 'General'}
  </span>
);

// A sub-component for the author section
const AuthorInfo = ({ author, date }) => {
  const getInitials = (name) => {
    if (!name) return 'A';
    const names = name.split(' ');
    if (names.length > 1) return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex items-center space-x-3">
      {author?.avatarUrl ? (
        <img src={author.avatarUrl} alt={author.name} className="w-10 h-10 rounded-full object-cover" />
      ) : (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">
          {getInitials(author?.name)}
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-slate-900">{author?.name || 'Anonymous'}</p>
        <p className="text-xs text-slate-500">{date}</p>
      </div>
    </div>
  );
};

const BlogCard = ({ post, showActions = false, onDelete, theme = 'green' }) => {
  const { isPostSaved, toggleSave } = useSavedPosts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSaved = isPostSaved(post._id);

  // --- UPDATED: themes object now includes 'hoverShadow' classes ---
  const themes = {
    green: {
      bar: 'bg-gradient-to-r from-green-400 to-emerald-400',
      hoverShadow: 'hover:shadow-[0_0_50px_0px_rgba(34,197,94,0.3),_0_0_50px_0px_rgba(52,211,153,0.2)]' 
    },
    purple: {
      bar: 'bg-purple-400',
      hoverShadow: 'hover:shadow-[0_0_20px_0px_rgba(139,92,246,0.3),_0_0_40px_0px_rgba(167,139,250,0.2)]' 
    },
    orange: {
      bar: 'bg-gradient-to-r from-orange-200 to-orange-400',
      hoverShadow: 'hover:shadow-[0_0_20px_0px_rgba(249,115,22,0.3),_0_0_40px_0px_rgba(251,146,60,0.2)]' 
    },
    blue: {
      bar: 'bg-gradient-to-r from-blue-200 to-indigo-300',
      hoverShadow: 'hover:shadow-[0_0_20px_0px_rgba(14,165,233,0.3),_0_0_40px_0px_rgba(56,189,248,0.2)]' 
    },
     red: {
      bar: 'bg-gradient-to-r from-red-300 to-red-500',
     hoverShadow: 'hover:shadow-[0_0_20px_0px_rgba(239,68,68,0.3),_0_0_40px_0px_rgba(248,113,113,0.2)]'
    },
     pink: {
      bar: 'bg-gradient-to-r from-pink-200 to-purple-300',
    hoverShadow: 'hover:shadow-[0_0_20px_0px_rgba(236,72,153,0.3),_0_0_40px_0px_rgba(244,114,182,0.2)]'
    },
      yellow: {
      bar: 'bg-gradient-to-r from-yellow-300 to-yellow-500',
    hoverShadow: 'hover:shadow-[0_0_20px_0px_rgba(250,204,21,0.3),_0_0_40px_0px_rgba(251,191,36,0.2)]'
    },
  };

  // Select the correct theme classes, falling back to 'green'
  const selectedTheme = themes[theme] || themes.green;

  const handleSaveClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    toggleSavePost(post._id).then(() => {
      toggleSave(post._id);
    });
  };

  const stringDate = new Date(post.datecreated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link 
      to={`/read-blog/${post._id}`} 
      // --- UPDATED: Dynamic hover shadow applied here ---
      className={`group bg-slate-100 rounded-2xl shadow-md overflow-hidden ${selectedTheme.hoverShadow} transition-all duration-300 h-full flex flex-col`}
    >
      {/* Image Container */}
      <div className="aspect-video overflow-hidden">
        <img
          src={post.imageUrl || 'https://placehold.co/600x400/E2E8F0/334155?text=Image'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Main Content Container (Title & Description) */}
      <div className="p-6 flex flex-col flex-grow">
        <CategoryTag category={post.category} />
        <h2 className="text-xl font-bold font-serif text-slate-900 leading-tight group-hover:text-purple-800 transition-colors">
          {post.title}
        </h2>
        <p className="mt-2 text-slate-600 text-base line-clamp-2 flex-grow">
          {post.description}
        </p>
        
        {/* Footer Content Section */}
        <div className="pt-6 mt-auto flex items-center justify-between">
          <AuthorInfo author={post.author} date={stringDate} />
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleSaveClick} 
              className="p-2 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors"
              aria-label="Save post"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>

            {showActions && (
              <div className="relative">
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} 
                  className="p-2 rounded-full hover:bg-slate-100"
                  aria-label="Actions"
                >
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" /></svg>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-md shadow-lg z-30">
                    <div className="py-1">
                      <Link to={`/edit-post/${post._id}`} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                        Edit Post
                      </Link>
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(post._id); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100">
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
      
      {/* --- THE COLORED BOTTOM BAR (now uses dynamic selectedTheme.bar) --- */}
      <div className={`${selectedTheme.bar} h-2 rounded-b-2xl`}></div> 
    </Link>
  );
};

export default BlogCard;