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
      } catch {
        alert("Unable to load post.");
        navigate('/home');
      }
    };
    getPost();
  }, [id, navigate]);

  const handleChange = (e) => {
    setPost(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateOnePost(id, post);
      alert("Post updated successfully!");
      navigate(`/read-blog/${id}`);
    } catch {
      alert("Update failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-28 max-w-4xl mx-auto p-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#0a1a2f] to-[#0f2e45] 
                      text-cyan-300 p-8 rounded-2xl shadow-xl border border-cyan-800/40 mb-10">

        <h1 className="font-serif text-4xl md:text-5xl font-bold text-center text-cyan-200 drop-shadow">
          Edit Blog
        </h1>

        <p className="mt-1 text-center text-cyan-400/80 text-lg">
          Update your content with a clean and professional editor.
        </p>
      </div>

      {/* FORM */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-[#0b1f33] border border-cyan-900/40 rounded-2xl shadow-xl p-8 space-y-8"
      >

        {/* TITLE */}
        <div>
          <label className="block text-cyan-300 font-semibold mb-1">Title</label>
          <input
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md bg-[#0c243d] text-cyan-100
                       border border-cyan-700/50 shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-cyan-300 font-semibold mb-1">Short Description</label>
          <input
            name="description"
            value={post.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md bg-[#0c243d] text-cyan-100
                       border border-cyan-700/50 shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="block text-cyan-300 font-semibold mb-1">Content</label>
          <textarea
            name="content"
            rows={12}
            value={post.content}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md bg-[#0c243d] text-cyan-100
                       border border-cyan-700/50 shadow-sm resize-none
                       focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* SAVE BUTTON */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="px-10 py-3 rounded-xl text-white font-semibold 
                       bg-gradient-to-r from-cyan-500 to-cyan-700 
                       hover:scale-105 active:scale-95 transition-all shadow-lg 
                       disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <FiLoader className="animate-spin text-white text-xl" />
                Saving...
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditBlog;
