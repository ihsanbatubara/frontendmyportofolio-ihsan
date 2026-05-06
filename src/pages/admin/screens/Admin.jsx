import { useEffect, useState } from "react";
import { getAllPosts } from "../../../services/index/posts";
import { getAllCategories } from "../../../services/index/postCategories";
import { getAllUsers } from "../../../services/index/users";

const Admin = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await getAllPosts("", 1);
        setTotalPosts(postsResponse?.headers?.["x-total-count"] || postsResponse?.data?.length || 0);

        const categoriesResponse = await getAllCategories("", 1);
        setTotalCategories(categoriesResponse?.headers?.["x-total-count"] || categoriesResponse?.data?.length || 0);

        const usersResponse = await getAllUsers("", 1);
        setTotalUsers(usersResponse?.headers?.["x-total-count"] || usersResponse?.data?.length || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-black text-black uppercase tracking-tight mb-2">Dashboard</h1>
        <p className="text-gray-500 font-bold text-sm uppercase tracking-widest text-left">Overview of your portfolio activity</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <div className="bg-white border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default group">
          <h2 className="text-gray-500 font-black uppercase text-xs tracking-widest mb-4 group-hover:text-black transition-colors">Total Projects</h2>
          {isLoading ? (
            <div className="h-16 w-32 bg-gray-100 animate-pulse rounded-xl"></div>
          ) : (
            <p className="text-7xl font-black text-black tracking-tighter">{totalPosts}</p>
          )}
        </div>

        <div className="bg-white border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default group">
          <h2 className="text-gray-500 font-black uppercase text-xs tracking-widest mb-4 group-hover:text-black transition-colors">Total Categories</h2>
          {isLoading ? (
            <div className="h-16 w-32 bg-gray-100 animate-pulse rounded-xl"></div>
          ) : (
            <p className="text-7xl font-black text-black tracking-tighter">{totalCategories}</p>
          )}
        </div>

        <div className="bg-white border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-default group">
          <h2 className="text-gray-500 font-black uppercase text-xs tracking-widest mb-4 group-hover:text-black transition-colors">Total Users</h2>
          {isLoading ? (
            <div className="h-16 w-32 bg-gray-100 animate-pulse rounded-xl"></div>
          ) : (
            <p className="text-7xl font-black text-black tracking-tighter">{totalUsers}</p>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Admin;
