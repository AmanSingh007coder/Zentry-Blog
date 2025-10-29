import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOnePost, updateOnePost } from '../api';
import { FiLoader } from 'react-icons/fi'; 

const EditBlog = () => {
  const [post, setPost] = useState({ title: '', description: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchOnePost(id);
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post for editing:", error);
        alert("Failed to load post for editing.");
        navigate('/home'); 
      }
    };
    getPost();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevPost => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateOnePost(id, post);
      alert("Post updated successfully!");
      navigate(`/read-blog/${id}`);
    } catch (error) {
      console.error("Failed to update post:", error);
      alert("Failed to update post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-purple-50 rounded-xl border border-purple-200 shadow-xl p-6 md:p-10 mt-20 max-w-3xl mx-auto">
      
      <h1 className="relative inline-block font-serif text-3xl md:text-4xl font-bold text-purple-800 pb-2 mb-8">
        Edit Your Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input 
            id="title" 
            name="title" 
            type="text" 
            value={post.title} 
            onChange={handleChange} 
            required 
            className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-purple-300 text-slate-700" 
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <input 
            id="description" 
            name="description" 
            type="text" 
            value={post.description} 
            onChange={handleChange} 
            required 
            className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-purple-300 text-slate-700" 
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">Content</label>
          <textarea 
            id="content" 
            name="content" 
            rows={10} 
            value={post.content} 
            onChange={handleChange} 
            required 
            className="mt-1 block w-full px-4 py-2 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-purple-300 text-slate-700" 
          />
        </div>
        <div className="text-right">
          <button 
            type="submit" 
            disabled={isLoading} 
            className="inline-flex items-center justify-center py-2 px-6 border border-transparent rounded-md shadow-md text-base font-semibold text-white 
                        bg-orange-500 hover:bg-orange-600
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;