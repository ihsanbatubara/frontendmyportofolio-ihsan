import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments, FaUser, FaBriefcase, FaFilePdf, FaAward } from "react-icons/fa";



import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { createPost } from "../../../../services/index/posts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { images } from "../../../../constants";

const Header = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();

  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } = useMutation({
    mutationFn: ({ slug, token }) => createPost({ token }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Post is created, edit that now! 🎉", { autoClose: 3000 });
      navigate(`/admin/posts/manage/edit/${data.slug}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create post.");
      console.error("Post creation error:", error);
    },
  });

  const toggleMenuHandler = () => {
    setIsMenuActive((prev) => !prev);
  };

  const handleCreateNewPost = () => {
    if (!userState?.userInfo?.token) {
      toast.error("User is not authenticated.");
      return;
    }
    mutateCreatePost({ token: userState.userInfo.token });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <header className="flex h-fit w-full items-center justify-between p-4 lg:h-screen lg:sticky lg:top-0 lg:max-w-[280px] lg:flex-col lg:items-stretch lg:justify-start lg:p-0 bg-white border-b-2 lg:border-b-0 lg:border-r-4 border-black z-50">
        {/* logo */}
        <div className="p-8 border-b-2 border-black hidden lg:block">
          <Link to="/" className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full font-bold text-2xl mx-auto shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
            TF
          </Link>
          <p className="text-center mt-4 font-black uppercase text-[10px] tracking-widest text-black">Admin Panel</p>
        </div>

        <div className="lg:hidden flex items-center gap-3">
          <Link to="/" className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
            TF
          </Link>
          <span className="font-black uppercase text-[10px] tracking-widest">Admin</span>
        </div>

        {/* menu burger icon (hanya untuk mobile) */}
        <div className="cursor-pointer lg:hidden">
          {isMenuActive ? (
            <AiOutlineClose className="w-8 h-8 text-black border-2 border-black p-1 rounded-md" onClick={toggleMenuHandler} />
          ) : (
            <AiOutlineMenu className="w-8 h-8 text-black border-2 border-black p-1 rounded-md" onClick={toggleMenuHandler} />
          )}
        </div>

        {/* sidebar container (selalu tampil di desktop, toggle di mobile) */}
        {(isMenuActive || windowSize.width >= 1024) && (
          <div className="fixed inset-0 lg:static lg:h-full lg:w-full z-40">
            {/* underlay untuk mobile */}
            {windowSize.width < 1024 && (
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={toggleMenuHandler} />
            )}

            {/* sidebar content */}
            <div className="fixed top-0 bottom-0 left-0 w-[280px] bg-white p-6 lg:static lg:h-full lg:w-full lg:p-6 z-50 flex flex-col border-r-4 border-black lg:border-r-0 overflow-y-auto custom-scrollbar">
              <div className="lg:hidden mb-8 border-b-2 border-black pb-6 text-center">
                <Link to="/" className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center font-bold text-2xl mx-auto shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
                  TF
                </Link>
              </div>

              <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6 px-4">Navigation</h4>
              
              <div className="flex flex-col gap-y-4">
                <NavItem title="Dashboard" link="/admin" icon={<AiFillDashboard />} name="dashboard" activeNavName={activeNavName} setActiveNavName={setActiveNavName} />

                <NavItemCollapse title="Projects" icon={<MdDashboard />} name="posts" activeNavName={activeNavName} setActiveNavName={setActiveNavName}>
                  <div className="flex flex-col gap-2 mt-2 pl-4 border-l-4 border-black ml-4 py-2">
                    <Link to="/admin/posts/manage" className="px-4 py-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-black transition">
                      • Manage All
                    </Link>

                    <Link to="/admin/categories/manage" className="px-4 py-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-black transition">
                      • Categories
                    </Link>
                  </div>
                </NavItemCollapse>

                <NavItem title="Comments" link="/admin/comments" icon={<FaComments />} name="comments" activeNavName={activeNavName} setActiveNavName={setActiveNavName} />
                <NavItem title="Experience" link="/admin/experiences/manage" icon={<FaBriefcase />} name="experiences" activeNavName={activeNavName} setActiveNavName={setActiveNavName} />
                <NavItem title="Certificates" link="/admin/certificates/manage" icon={<FaAward />} name="certificates" activeNavName={activeNavName} setActiveNavName={setActiveNavName} />

                <NavItem title="Resume" link="/admin/resume/manage" icon={<FaFilePdf />} name="resume" activeNavName={activeNavName} setActiveNavName={setActiveNavName} />
                <NavItem title="Users" link="/admin/users/manage" icon={<FaUser />} name="users" activeNavName={activeNavName} setActiveNavName={setActiveNavName} />


              </div>

              {/* Bottom Actions */}
              <div className="mt-auto pt-8">
                 <Link to="/" className="w-full flex items-center justify-center gap-2 bg-[#f0f0f0] hover:bg-black hover:text-white px-4 py-3 rounded-xl border-2 border-black font-bold text-sm transition-all active:scale-95 shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                    Back to Website
                 </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
