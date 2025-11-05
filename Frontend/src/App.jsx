import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landing from "./Pages/Landing";
import HomePage from "./Pages/Homepage";
import ReadBlog from "./Pages/ReadBlog";
import CreateBlog from "./Pages/CreateBlog";
import EditBlog from "./Pages/EditBlog";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import SearchResults from './Pages/SearchResults';
import AdminUsers from './Pages/Admin/AdminUsers';
import AdminPosts from './Pages/Admin/AdminPosts';
import Layout from './components/Layout';
import axios from 'axios';
import { useEffect } from 'react';
import { SavedPostsProvider } from './context/SavedPostsContext';
import SavedPosts from './Pages/SavedPosts';

const App = () => {

useEffect(() => {
  const token = sessionStorage.getItem("User");
  if(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}, []);

  return (
    <>
    <Router>
      <SavedPostsProvider>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/read-blog/:id' element={<ReadBlog/>}/>
        <Route element={<Layout/>}>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/create-blog' element={<CreateBlog/>}/>
        <Route path='/edit-post/:id' element={<EditBlog/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/search' element={<SearchResults/>}/>
        <Route path='/saved' element={<SavedPosts />} />
        <Route path='/admin/users' element={<AdminUsers />} />
        <Route path='/admin/posts' element={<AdminPosts />} />
        </Route>
      </Routes>
      </SavedPostsProvider>
    </Router>
    </>
  )
}

export default App;
