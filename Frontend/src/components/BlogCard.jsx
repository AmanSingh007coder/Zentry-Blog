import { Link } from 'react-router-dom';
import { useSavedPosts } from '../context/SavedPostsContext';
import { toggleSavePost } from '../api';
import { useState } from 'react';


const CategoryTag = ({ category }) => (
  <span className="inline-block bg-indigo-200 text-black text-xs font-semibold px-2.5 py-1 rounded-full mb-4">
    {category || 'General'}
  </span>
);

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
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">
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

const BlogCard = ({ post, showActions = false, onDelete }) => {
  const { isPostSaved, toggleSave } = useSavedPosts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSaved = isPostSaved(post._id);

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
    <div className="relative group bg-slate-200 rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
     
      <button 
        onClick={handleSaveClick} 
        className="absolute top-4 right-4 z-20 p-2 bg-white/70 backdrop-blur-sm rounded-full text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Save post"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>

      <Link to={`/read-blog/${post._id}`} className="flex flex-col flex-grow">
       
        <div className="aspect-video overflow-hidden">
          <img
            src={post.imageUrl || 'https://placehold.co/600x400/E2E8F0/334155?text=Image'}
            alt={post.title}
            
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

    
        <div className="p-6 flex flex-col flex-grow">
          <CategoryTag category={post.category} />
          <h2 className="text-xl font-bold font-serif text-slate-900 leading-tight group-hover:text-purple-800 transition-colors">
            {post.title}
          </h2>
          <p className="mt-2 text-slate-600 text-base line-clamp-2 flex-grow">
            {post.description}
          </p>
          
     
          <div className="mt-6 flex items-center justify-between">
            <AuthorInfo author={post.author} date={stringDate} />
            
          
            {showActions && (
              <div className="relative">
                <button 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    setIsMenuOpen(!isMenuOpen); 
                  }} 
                  className="p-2 rounded-full hover:bg-slate-100"
                  aria-label="Actions"
                >
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" /></svg>
                </button>

           
                {isMenuOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-md shadow-lg z-30">
                    <div className="py-1">
                      <Link 
                        to={`/edit-post/${post._id}`} 
                        className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                      >
                        Edit Post
                      </Link>
                      <button 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          onDelete(post._id); 
                          setIsMenuOpen(false); 
                        }} 
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
      </Link>
    </div>
  );
};

export default BlogCard;