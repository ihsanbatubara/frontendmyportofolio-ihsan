import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/index/users";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const AdminLayout = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
    onSuccess: (data) => {
      if (!data?.admin) {
        navigate("/");
        toast.error("Your are not allowed to access admin panel");
      }
    },
    onError: (err) => {
      console.log(err);
      navigate("/");
      toast.error("Your are not allowed to access admin panel");
    },
  });

  if (profileIsLoading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-[#f8f8f8]">
        <div className="relative">
          {/* Brutalist Spinner */}
          <div className="w-20 h-20 border-8 border-black border-t-yellow-400 rounded-full animate-spin shadow-[8px_8px_0px_rgba(0,0,0,0.1)]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 bg-black rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-2">
          <h3 className="text-2xl font-black uppercase tracking-tighter text-black">
            Authorizing
          </h3>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen lg:flex-row bg-[#f8f8f8] font-montserrat">
      <Header />
      <main className="flex-1 p-4 lg:p-10">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
