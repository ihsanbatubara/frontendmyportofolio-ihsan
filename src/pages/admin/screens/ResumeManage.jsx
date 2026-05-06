import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getUserProfile, updateResume } from "../../../services/index/users";
import { userActions } from "../../../store/reducers/userReducers";
import { FaFilePdf, FaCloudUploadAlt, FaExternalLinkAlt } from "react-icons/fa";

const ResumeManage = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryFn: () => getUserProfile({ token: userState.userInfo.token }),
    queryKey: ["profile"],
  });

  const { mutate: mutateResume, isLoading: updateResumeIsLoading } = useMutation({
    mutationFn: ({ formData }) => {
      return updateResume({
        token: userState.userInfo.token,
        formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo({ ...userState.userInfo, resume: data.resume }));
      localStorage.setItem("account", JSON.stringify({ ...userState.userInfo, resume: data.resume }));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Resume is updated successfully! 📄");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        return toast.error("Only PDF files are allowed!");
      }
      const formData = new FormData();
      formData.append("resume", file);
      mutateResume({ formData });
    }
  };

  return (
    <div className="p-6 min-h-screen font-montserrat">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-10 border-4 border-black rounded-[40px] shadow-[16px_16px_0px_#000]">
          <h2 className="text-4xl font-black uppercase tracking-tight text-black mb-4">
            Resume Management
          </h2>
          <p className="text-gray-500 font-bold mb-10 uppercase text-xs tracking-widest">
            Upload and manage your professional CV/Resume (PDF format)
          </p>

          <div className="space-y-10">
            {/* Current Resume Info */}
            <div className="bg-gray-50 border-2 border-black rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-2xl border-2 border-black flex items-center justify-center text-4xl shadow-[4px_4px_0px_#000]">
                <FaFilePdf />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-black uppercase">Your Current Resume</h3>
                <p className="text-sm text-gray-500 font-bold mt-1">
                  {profileData?.resume ? "Last updated on Cloudinary" : "No resume uploaded yet"}
                </p>
                {profileData?.resume && (
                  <a
                    href={profileData.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-black font-black text-sm underline decoration-yellow-400 decoration-4 underline-offset-4 hover:text-gray-600 transition-all"
                  >
                    View Current PDF <FaExternalLinkAlt className="text-xs" />
                  </a>
                )}
              </div>
            </div>

            {/* Upload Area */}
            <div className="flex flex-col gap-4">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">
                Upload New Resume
              </label>
              <div className="relative group">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf"
                  onChange={handleResumeChange}
                  className="hidden"
                  disabled={updateResumeIsLoading}
                />
                <label
                  htmlFor="resume-upload"
                  className={`w-full flex flex-col items-center justify-center gap-4 py-12 border-4 border-dashed border-black rounded-[32px] cursor-pointer transition-all ${
                    updateResumeIsLoading 
                    ? "bg-gray-100 opacity-50 cursor-not-allowed" 
                    : "bg-yellow-50 hover:bg-yellow-100 group-hover:scale-[1.01]"
                  }`}
                >
                  <FaCloudUploadAlt className="text-5xl text-black" />
                  <div className="text-center">
                    <span className="block text-xl font-black uppercase">
                      {updateResumeIsLoading ? "Uploading File..." : "Click to select PDF"}
                    </span>
                    <span className="text-xs font-bold text-gray-500">Max file size: 5MB</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Note */}
            <div className="bg-blue-50 border-2 border-black rounded-2xl p-6">
              <p className="text-xs font-bold text-blue-800 leading-relaxed">
                <span className="font-black uppercase mr-2">Note:</span>
                Uploading a new resume will automatically replace the existing one. The link in your Hero section on the homepage will always point to the latest version.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeManage;
