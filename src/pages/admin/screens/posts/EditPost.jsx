import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { getSinglePost, updatePost } from "../../../../services/index/posts";
import { Link, useParams, useNavigate } from "react-router-dom";
import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import { stables } from "../../../../constants";
import { HiOutlineCamera } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS untuk react-toastify
import { useSelector } from "react-redux";
import Editor from "../../../../components/editor/Editor";
import MultiSelectTagDropdown from "../../components/select-dropdown/MultiSelectTagDropdown";
import { getAllCategories } from "../../../../services/index/postCategories";
import {
  categoryToOption,
  filterCategories,
} from "../../../../utils/multiSelectTagUtils";

const promiseOptions = async (inputValue) => {
  const { data: categoriesData } = await getAllCategories();
  return filterCategories(inputValue, categoriesData);
};

const EditPost = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const [initialPhoto, setInitialPhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [body, setBody] = useState(null);
  const [categories, setCategories] = useState(null);
  const [title, setTitle] = useState("");
  const [postSlug, setPostSlug] = useState(slug);
  const [caption, setCaption] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      setInitialPhoto(data?.photo);
      setCategories(data.categories.map((item) => item._id));
      setTitle(data.title);
      setCaption(data.caption);
      setGithub(data.github);
      setDemo(data.demo);
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdatePostDetail, isLoading: isLoadingUpdatePostDetail } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => {
      return updatePost({ updatedData, slug, token });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["blog", slug]);
      toast.success("Post is updated! 🎉", { autoClose: 3000 });

      setTimeout(() => {
        navigate(`/admin/posts/manage/edit/${data.slug}`, { replace: true });
      }, 3000);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleUpdatePost = async () => {
    let updatedData = new FormData();
  
    if (photo) {
      updatedData.append("postPicture", photo);
    } else if (initialPhoto) {
      // Konversi URL gambar lama ke File
      const urlToObject = async (url) => {
        let response = await fetch(url);
        let blob = await response.blob();
        return new File([blob], "previous-image.jpg", { type: blob.type });
      };
      const oldPhoto = await urlToObject(data?.photo);
      updatedData.append("postPicture", oldPhoto);
    }
  
    updatedData.append(
      "document",
      JSON.stringify({ body, categories, title, slug: postSlug, caption, github, demo})
    );
  
    mutateUpdatePostDetail({
      updatedData,
      slug,
      token: userState.userInfo.token,
    });
  };
  
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    <div className="container mx-auto max-w-4xl p-10 bg-white border-4 border-black rounded-[40px] shadow-[16px_16px_0px_rgba(0,0,0,0.1)] mb-20">
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <div className="space-y-10">
          <div>
             <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Edit Project</h2>
             <div className="flex flex-col items-center group cursor-pointer">
              <label htmlFor="postPicture" className="w-full relative overflow-hidden rounded-3xl border-4 border-black shadow-[8px_8px_0px_#000] transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                {photo ? (
                  <img src={URL.createObjectURL(photo)} alt={data?.title} className="w-full aspect-video object-cover" />
                ) : initialPhoto ? (
                  <img src={data?.photo} alt={data?.title} className="w-full aspect-video object-cover" />
                ) : (
                  <div className="w-full aspect-video bg-gray-100 flex flex-col justify-center items-center gap-4">
                    <HiOutlineCamera className="text-black w-16 h-16" />
                    <span className="font-black uppercase text-xs tracking-widest">Click to upload cover</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="text-white font-black uppercase tracking-widest text-sm">Change Image</span>
                </div>
              </label>
              <input type="file" className="hidden" id="postPicture" onChange={handleFileChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Project Title</label>
              <input type="text" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Slug (URL)</label>
              <input type="text" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={postSlug} onChange={(e) => setPostSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Caption / Subtitle</label>
            <input type="text" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={caption} onChange={(e) => setCaption(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Github Repository URL</label>
              <input type="text" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={github} onChange={(e) => setGithub(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Live Demo URL</label>
              <input type="text" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={demo} onChange={(e) => setDemo(e.target.value)} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Categories</label>
            <div className="brutalist-select">
              <MultiSelectTagDropdown loadOptions={promiseOptions} defaultValue={data.categories.map(categoryToOption)} onChange={(newValue) => setCategories(newValue.map((item) => item.value))} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Project Description & Content</label>
            <div className="border-2 border-black rounded-xl overflow-hidden min-h-[400px]">
              <Editor content={data?.body} editable={true} onDataChange={(data) => setBody(data)} />
            </div>
          </div>

          <button 
            onClick={handleUpdatePost} 
            disabled={isLoadingUpdatePostDetail}
            className="w-full bg-black text-white font-black uppercase py-5 rounded-2xl border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoadingUpdatePostDetail ? "Updating Project..." : "Update Project Detail"}
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default EditPost;
