import { useState, useEffect } from 'react';
import { fetchAllPostsAdmin, deletePostAdmin } from '../../api';
import { Link } from 'react-router-dom';

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchAllPostsAdmin();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load posts for admin panel", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to permanently delete this post?")) {
      try {
        await deletePostAdmin(postId);
        setPosts(currentPosts => currentPosts.filter(post => post._id !== postId));
      } catch (error) {
        alert("Failed to delete post.");
      }
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading all posts...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mt-20">
      <h1 className="text-3xl font-bold font-serif mb-6 text-orange-600">Post Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map(post => (
              <tr key={post._id}>
                <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                <td className="px-6 py-4 text-gray-500">{post.author?.name || 'N/A'}</td>
                <td className="px-6 py-4 text-gray-500">{post.category}</td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                     <Link 
                    to={`/edit-post/${post._id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-5">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPosts;