import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../../../../services/index/postCategories";
import DataTable from "../../components/DataTable";
import { toast } from "react-hot-toast";
import { useState } from "react";

const Categories = () => {
  const [categoryTitle, setCategoryTitle] = useState("");

  const { mutate: mutateCreateCategory, isLoading: isLoadingCreateCategory } =
    useMutation({
      mutationFn: ({ token, title }) => createCategory({ token, title }),
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
        setCategoryTitle("");
        toast.success("Category Created! 🎉");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const {
    userState,
    currentPage,
    searchKeyword,
    data: categoriesData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllCategories(searchKeyword, currentPage, 20),
    dataQueryKey: "categories",
    deleteDataMessage: "Category deleted successfully",
    mutateDeleteFn: ({ slug, token }) => deleteCategory({ slug, token }),
  });

  const handleCreateCategory = () => {
    if (!categoryTitle) return toast.error("Please enter a category title");
    mutateCreateCategory({
      token: userState.userInfo.token,
      title: categoryTitle,
    });
  };

  return (
    <div className="p-2 lg:p-6 min-h-screen font-montserrat">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Add New Category Card */}
        <div className="col-span-1 md:col-span-4 bg-white p-8 border-4 border-black rounded-[40px] shadow-[12px_12px_0px_#000] md:sticky md:top-10">

          <h4 className="text-2xl font-black uppercase tracking-tight text-black mb-8 underline decoration-yellow-300 decoration-4 underline-offset-8">
            Add New Category
          </h4>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">
                Category Title
              </label>
              <input
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                placeholder="e.g. Frontend Development"
                className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all placeholder:text-gray-300"
              />
            </div>
            
            <button
              onClick={handleCreateCategory}
              disabled={isLoadingCreateCategory}
              className="w-full bg-yellow-300 text-black font-black uppercase py-4 rounded-2xl border-2 border-black shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isLoadingCreateCategory ? "Adding..." : "Add Category"}
            </button>
          </div>
        </div>

        {/* Categories Table Area */}
        <div className="col-span-1 md:col-span-8">
          <DataTable
            pageTitle="Manage Categories"
            dataListName="Categories List"
            searchInputPlaceHolder="Search categories..."
            searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
            searchKeywordOnChangeHandler={searchKeywordHandler}
            searchKeyword={searchKeyword}
            tableHeaderTitleList={["Title", "Created At", "Actions"]}
            isLoading={isLoading}
            isFetching={isFetching}
            data={categoriesData?.data}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            headers={categoriesData?.headers}
            userState={userState}
          >
            {categoriesData?.data.map((category) => (
              <tr key={category._id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-5">
                  <span className="font-black text-black group-hover:underline underline-offset-4 decoration-2">
                    {category.title}
                  </span>
                </td>
                <td className="px-6 py-5 text-gray-500 font-bold text-sm">
                  {new Date(category.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/admin/categories/manage/edit/${category._id}`}
                      className="bg-black text-white px-4 py-2 rounded-lg font-bold text-xs border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                    >
                      Edit
                    </Link>
                    <button
                      disabled={isLoadingDeleteData}
                      onClick={() => deleteDataHandler({ slug: category._id, token: userState.userInfo.token })}
                      className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold text-xs border-2 border-red-600 shadow-[2px_2px_0px_rgba(220,38,38,0.3)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default Categories;
