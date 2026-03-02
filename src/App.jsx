import { Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import HomePage from './pages/home/HomePage';
import About from './pages/home/container/About';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import ProjectPage from './pages/project/ProjectPage';
import AdminLayout from './pages/admin/AdminLayout';
import Admin from './pages/admin/screens/Admin';
import Comments from './pages/admin/screens/comments/Comments';
import ManagePosts from './pages/admin/screens/posts/ManagePosts';
import EditPost from './pages/admin/screens/posts/EditPost';
import Categories from "./pages/admin/screens/categories/Categories";
import EditCategories from "./pages/admin/screens/categories/EditCategories";
import Users from "./pages/admin/screens/users/Users";
import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage';
import Aos from "aos";
import "aos/dist/aos.css";
import Skills from './pages/home/container/Skills';
import Articles from './pages/home/container/Articles';
import Contact from './pages/home/container/Contact';
import Chatbot from './components/chatbot/Chatbot';

function App() {
  useEffect(function () {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className='App font-opensans'>
      {/* Chatbot Flowise */}
      
      {/* Routing Halaman */}
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/skills' element={<Skills />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/project' element={<Articles />} />
        <Route path='/projectall' element={<ProjectPage />} />
        <Route path='/projectall/:slug' element={<ArticleDetailPage />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path='comments' element={<Comments />} />
          <Route path='posts/manage' element={<ManagePosts />} />
          <Route path='posts/manage/edit/:slug' element={<EditPost />} />
          <Route path='categories/manage' element={<Categories />} />
          <Route path='categories/manage/edit/:slug' element={<EditCategories />} />
          <Route path='users/manage' element={<Users />} />
        </Route>
      </Routes>
      
      {/* Notifikasi */}
      <Chatbot />
      <Toaster />
    </div>
  );
}

export default App;
