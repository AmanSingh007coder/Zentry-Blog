import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchSavedPosts } from '../api';

export const SavedPostsContext = createContext();

// A custom hook to make using the context easier
export const useSavedPosts = () => {
  return useContext(SavedPostsContext);
};

export const SavedPostsProvider = ({ children }) => {
  const [savedPostIds, setSavedPostIds] = useState(new Set());

  useEffect(() => {
    // Fetch the initial list of saved posts when the app loads
    const getSaved = async () => {
      try {
        const savedPosts = await fetchSavedPosts();
        // We only store the IDs in a Set for fast lookups (e.g., isPostSaved?)
        setSavedPostIds(new Set(savedPosts.map(p => p._id)));
      } catch (error) {
        console.error("Could not fetch saved posts for context", error);
      }
    };
    // Only fetch if a user is logged in
    const token = sessionStorage.getItem("User");
    if (token) getSaved();
  }, []);

  const isPostSaved = (postId) => savedPostIds.has(postId);

  const toggleSave = (postId) => {
    setSavedPostIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <SavedPostsContext.Provider value={{ isPostSaved, toggleSave }}>
      {children}
    </SavedPostsContext.Provider>
  );
};