import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import MainLayout from "../../components/MainLayout";
import { getUserProfile, updateProfile } from "../../services/index/users";
import ProfilePicture from "../../components/ProfilePicture";
import { userActions } from "../../store/reducers/userReducers";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);

  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryFn: () => getUserProfile({ token: userState.userInfo.token }),
    queryKey: ["profile"],
  });

  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password },
        userId: userState.userInfo._id,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile updated successfully! 🎉");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: useMemo(() => {
      return {
        name: profileIsLoading ? "" : profileData?.name,
        email: profileIsLoading ? "" : profileData?.email,
      };
    }, [profileData?.email, profileData?.name, profileIsLoading]),
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  return (
    <MainLayout>
      <section className="min-h-screen bg-[#f8f8f8] py-20 font-montserrat">
        <div className="container mx-auto px-5">
          <div className="max-w-xl mx-auto bg-white border-4 border-black rounded-[40px] shadow-[20px_20px_0px_rgba(0,0,0,1)] p-10 md:p-14">
            <h2 className="text-4xl font-black uppercase tracking-tight text-black mb-10 text-center md:text-left underline decoration-yellow-400 decoration-8 underline-offset-8">
              Your Profile
            </h2>
            
            <div className="mb-12">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block px-1">
                Profile Avatar
              </label>
              <ProfilePicture avatar={profileData?.avatar} />
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    minLength: { value: 1, message: "Name must be at least 1 character" },
                    required: { value: true, message: "Name is required" },
                  })}
                  placeholder="Enter your name"
                  className={`w-full bg-white border-2 border-black p-5 rounded-2xl font-bold text-black outline-none focus:shadow-[6px_6px_0px_#000] transition-all ${
                    errors.name ? "border-red-500" : "border-black"
                  }`}
                />
                {errors.name?.message && <p className="text-red-500 text-xs font-bold mt-1 px-1">{errors.name?.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Enter a valid email",
                    },
                    required: { value: true, message: "Email is required" },
                  })}
                  placeholder="Enter your email"
                  className={`w-full bg-white border-2 border-black p-5 rounded-2xl font-bold text-black outline-none focus:shadow-[6px_6px_0px_#000] transition-all ${
                    errors.email ? "border-red-500" : "border-black"
                  }`}
                />
                {errors.email?.message && <p className="text-red-500 text-xs font-bold mt-1 px-1">{errors.email?.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">
                  New Password (optional)
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  placeholder="Leave blank to keep current"
                  className="w-full bg-white border-2 border-black p-5 rounded-2xl font-bold text-black outline-none focus:shadow-[6px_6px_0px_#000] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={!isValid || profileIsLoading || updateProfileIsLoading}
                className="w-full bg-black text-white font-black uppercase py-5 rounded-2xl border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
              >
                {updateProfileIsLoading ? "Saving Changes..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
