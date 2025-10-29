import { useState, useEffect } from 'react';
import { fetchAllUsers, deleteUser } from '../../api'; 
import * as jwt_decode from 'jwt-decode';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("User");
    if (token) {
      const decoded = jwt_decode.jwtDecode(token);
      setCurrentUser(decoded);
    }
    
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to load users for admin panel", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      try {
        await deleteUser(userId);
        setUsers(currentUsers => currentUsers.filter(user => user._id !== userId));
      } catch (error) {
        alert("Failed to delete user.");
      }
    }
  };

  if (isLoading) {
    return <p className="text-center">Loading users...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8 mt-20">
      <h1 className="text-3xl font-bold font-serif mb-6 text-green-600">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDelete(user._id)}
                    disabled={currentUser?._id === user._id}
                    className="text-red-600 hover:text-red-900 disabled:text-gray-300 disabled:cursor-not-allowed"
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

export default AdminUsers;