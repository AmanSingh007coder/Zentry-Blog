import axios from "axios";

const URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3004";

const getToken = () => sessionStorage.getItem("User");


export async function fetchAllPosts() {
  try {
    const response = await axios.get(`${URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function fetchOnePost(id) {
  try {
    const response = await axios.get(`${URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
}

export async function createOnePost(post) {
  try {
    const token = getToken(); 
    const response = await axios.post(`${URL}/posts`, post, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function updateOnePost(id, post) {
  try {
    const response = await axios.put(`${URL}/posts/${id}`, post);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with id ${id}:`, error);
    throw error;
  }
}

export async function deleteOnePost(id) {
  try {
    const response = await axios.delete(`${URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post with id ${id}:`, error);
    throw error;
  }
}

export async function fetchMyPosts() {
  try {
    const token = sessionStorage.getItem("User");
    const response = await axios.get(`${URL}/posts/myposts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user's posts:", error);
    throw error;
  }
}


export async function searchPosts(query) {
  try {
    const response = await axios.get(`${URL}/posts/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching for posts with query "${query}":`, error);
    throw error;
  }
}

                                                               // user api

export async function fetchOneUser(id) {
  try {
    const response = await axios.get(`${URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
}

export async function createOneUser(user) {
  try {
    const response = await axios.post(`${URL}/users`, user);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateOneUser(id, user) {
  try {
    const response = await axios.put(`${URL}/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error;
  }
}

export async function verifyUser(user){
  const response = await axios.post(`${URL}/users/login`, user);
  if(response.data.success){
   return response.data.token;
}
else{
  return null;
}
}

export async function toggleSavePost(postId) {
  try { 
    const response = await axios.put(`${URL}/users/save/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error saving/unsaving post ${postId}:`, error);
    throw error;
  }
}

export async function fetchSavedPosts() {
  try { 
    const response = await axios.get(`${URL}/users/saved-posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    throw error;
  }
}

                                                                   // Admin API

export async function fetchAllUsers() {
  try {
    const response = await axios.get(`${URL}/admin/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await axios.delete(`${URL}/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with id ${userId}:`, error);
    throw error;
  }
}


export async function fetchAllPostsAdmin() {
  try {
    const response = await axios.get(`${URL}/admin/posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all posts for admin:", error);
    throw error;
  }
}

export async function deletePostAdmin(postId) {
  try {
    const response = await axios.delete(`${URL}/admin/posts/${postId}`);
    return response.data;
  } catch (error){
    console.error(`Error deleting post ${postId} for admin:`, error);
    throw error;
  }
}

export async function fetchComments(postId) {
  try {
    const token = getToken();
    const config = token ? {
      headers: { 'Authorization': `Bearer ${token}` }
    } : {};
    
    const response = await axios.get(`${URL}/posts/${postId}/comments`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

export async function createComment(postId, commentData) {
  try {
    const token = getToken();
    const response = await axios.post(`${URL}/posts/${postId}/comments`, commentData, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

export async function sendContactMessage(formData) {
  try {
    const response = await axios.post(`${URL}/contact`, formData);
    return response.data;
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw error;
  }
}

export async function fetchLandingPosts() {
  try {
    const response = await axios.get(`${URL}/posts`);
    const featured = response.data.filter(post => post.isFeatured).slice(0, 5);
    return featured;
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    throw error;
  }
}


export async function subscribeToNewsletter(email) {
  try {
    const response = await axios.post(`${URL}/subscribe`, { email });
    return response.data;
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    throw error;
  }
}

export async function deleteComment(commentId) {
  try {
    await axios.delete(`${URL}/comments/${commentId}`);
  } catch (error) {
    console.error(`Error deleting comment ${commentId}:`, error);
    throw error;
  }
}

export async function uploadAvatar(file) {
  try {
    const formData = new FormData();
    formData.append('avatarFile', file);

    const response = await axios.put(`${URL}/users/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
}

