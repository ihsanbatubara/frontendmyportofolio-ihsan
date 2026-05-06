import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from 'framer-motion';

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
import ManageExperiences from './pages/admin/screens/experiences/ManageExperiences';
import EditExperience from './pages/admin/screens/experiences/EditExperience';
import ResumeManage from './pages/admin/screens/ResumeManage';
import Users from "./pages/admin/screens/users/Users";
import ManageCertificates from './pages/admin/screens/certificates/ManageCertificates';
import EditCertificate from './pages/admin/screens/certificates/EditCertificate';
import CertificatesPage from './pages/certificates/CertificatesPage';




import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage';
import Aos from "aos";
import "aos/dist/aos.css";
import Skills from './pages/home/container/Skills';
import Articles from './pages/home/container/Articles';
import Contact from './pages/home/container/Contact';
import MainLayout from './components/MainLayout';
import Chatbot from './components/chatbot/Chatbot';
import Transition from './components/Transition';

// Wrapped Components
const AboutPage = Transition(() => <MainLayout><div className="bg-[#f8f8f8] min-h-screen"><About /></div></MainLayout>);
const SkillsPage = Transition(() => <MainLayout><Skills /></MainLayout>);
const ContactPage = Transition(() => <MainLayout><Contact /></MainLayout>);
const ProjectArticlesPage = Transition(() => <MainLayout><Articles /></MainLayout>);
const AllProjectsPage = Transition(() => <MainLayout><ProjectPage /></MainLayout>);
const ArticleDetailWithTransition = Transition(() => <MainLayout><ArticleDetailPage /></MainLayout>);
const LoginWithTransition = Transition(LoginPage);
const RegisterWithTransition = Transition(RegisterPage);
const ProfileWithTransition = Transition(ProfilePage);

function App() {
  const location = useLocation();

  useEffect(function () {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className='App font-montserrat'>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route index path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/skills' element={<SkillsPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/certificates' element={<CertificatesPage />} />


          <Route path='/login' element={<LoginWithTransition />} />
          <Route path='/register' element={<RegisterWithTransition />} />
          <Route path='/profile' element={<ProfileWithTransition />} />
          <Route path='/project' element={<ProjectArticlesPage />} />
          <Route path='/projectall' element={<AllProjectsPage />} />
          <Route path='/projectall/:slug' element={<ArticleDetailWithTransition />} />
          
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path='comments' element={<Comments />} />
            <Route path='posts/manage' element={<ManagePosts />} />
            <Route path='posts/manage/edit/:slug' element={<EditPost />} />
            <Route path='categories/manage' element={<Categories />} />
            <Route path='categories/manage/edit/:slug' element={<EditCategories />} />
            <Route path='experiences/manage' element={<ManageExperiences />} />
            <Route path='experiences/manage/edit/:id' element={<EditExperience />} />
            <Route path='certificates/manage' element={<ManageCertificates />} />
            <Route path='certificates/manage/edit/:id' element={<EditCertificate />} />
            <Route path='resume/manage' element={<ResumeManage />} />

            <Route path='users/manage' element={<Users />} />
          </Route>
        </Routes>
      </AnimatePresence>
      
      <Chatbot />
      <Toaster />
    </div>
  );
}

export default App;
