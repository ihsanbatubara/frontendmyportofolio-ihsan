import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  getSingleCategory,
  updateCategory,
} from "../../../../services/index/postCategories";

const EditCategories = () => {
  const queryClient = useQueryClient();
  const [categoryTitle, setCategoryTitle] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { isLoading, isError } = useQuery({
    queryFn: () => getSingleCategory({ slug }),
    queryKey: ["categories", slug],
    onSuccess: (data) => {
      setCategoryTitle(data?.title);
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateCategory, isLoading: isLoadingUpdateCategory } =
    useMutation({
      mutationFn: ({ title, slug, token }) => {
        return updateCategory({
          title,
          slug,
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["categories", slug]);
        toast.success("Category is updated successfully! 🏷️");
        navigate(`/admin/categories/manage`, {
          replace: true,
        });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleUpdateCategory = () => {
    if (!categoryTitle) return;
    mutateUpdateCategory({
      title: categoryTitle,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <div className="p-4 md:p-6 min-h-screen font-montserrat">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 md:p-12 border-4 border-black rounded-[30px] md:rounded-[40px] shadow-[8px_8px_0px_#000] md:shadow-[16px_16px_0px_#000]">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-black mb-4">
            Update Category
          </h2>
          <p className="text-gray-500 font-bold mb-8 md:mb-10 uppercase text-[10px] md:text-xs tracking-widest leading-relaxed">
            Modify the category title to organize your projects and posts effectively.
          </p>
          
          <div className="space-y-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="category-title" className="text-xs font-black uppercase tracking-widest text-black px-1">
                Category Title
              </label>
              <input
                id="category-title"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                placeholder="e.g. Web Development"
                className="w-full bg-[#f8f8f8] border-2 border-black p-4 rounded-2xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all placeholder:text-gray-300"
              />
            </div>

            <button
              disabled={isLoadingUpdateCategory || isLoading || isError}
              type="button"
              onClick={handleUpdateCategory}
              className={`w-full font-black uppercase py-5 rounded-2xl border-4 border-black transition-all flex items-center justify-center gap-2
                ${isLoadingUpdateCategory || isLoading || isError
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300"
                  : "bg-yellow-300 text-black shadow-[8px_8px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:scale-[0.98]"}`}
            >
              {isLoadingUpdateCategory || isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                "Update Category"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategories;
