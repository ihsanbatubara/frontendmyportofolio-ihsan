import React, { useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineCamera } from "react-icons/hi";
import CropEasy from "./crop/CropEasy";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePicture } from "../services/index/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userActions } from "../store/reducers/userReducers";
import { FaTrashAlt } from "react-icons/fa";

const ProfilePicture = ({ avatar }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateProfilePicture({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      setOpenCrop(false);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile Photo updated!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto({ url: URL.createObjectURL(file), file });
      setOpenCrop(true);
    }
  };

  const handleDeleteImage = () => {
    if (window.confirm("Do you want to delete your profile picture?")) {
      try {
        const formData = new FormData();
        formData.append("removeAvatar", "true");
        mutate({ token: userState.userInfo.token, formData: formData });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("portal")
        )}

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <div className="w-32 h-32 rounded-3xl border-4 border-black overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white relative">
            {avatar ? (
              <img
                src={avatar}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex justify-center items-center">
                <HiOutlineCamera className="w-10 h-auto text-black opacity-30" />
              </div>
            )}
            
            <label
              htmlFor="profilePicture"
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <HiOutlineCamera className="text-white text-3xl" />
            </label>
          </div>
          
          <input
            type="file"
            className="hidden"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label 
            htmlFor="profilePicture" 
            className="bg-black text-white px-6 py-2 rounded-xl font-bold text-sm border-2 border-black cursor-pointer shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Change Photo
          </label>
          {avatar && (
            <button
              onClick={handleDeleteImage}
              type="button"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-white text-red-600 px-6 py-2 rounded-xl font-bold text-sm border-2 border-red-600 shadow-[4px_4px_0px_rgba(220,38,38,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
            >
              <FaTrashAlt /> Remove
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePicture;
