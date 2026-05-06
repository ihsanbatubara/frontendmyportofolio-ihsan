import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "../../components/MainLayout";
import { signup } from "../../services/index/users";
import { userActions } from "../../store/reducers/userReducers";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));

      toast.success("Registration successful! 🎉 Redirecting to login...", {
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage, { autoClose: 3000 });
      console.error(error);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  const password = watch("password");

  return (
    <MainLayout>
      <ToastContainer />
      <section className="min-h-screen flex items-center justify-center bg-[#f8f8f8] py-20 px-6">
        <div className="w-full max-w-md bg-white border-4 border-black rounded-[40px] p-10 shadow-[16px_16px_0px_rgba(0,0,0,0.1)]">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-black uppercase tracking-tighter mb-2">
              Join Us
            </h1>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Create your account</p>
          </div>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-black px-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 1, message: "Name must be at least 1 character" },
                })}
                placeholder="John Doe"
                className={`w-full bg-white border-2 border-black p-4 rounded-2xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all placeholder:text-gray-300 ${
                  errors.name ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,0.2)]" : ""
                }`}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 px-1">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-black px-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email",
                  },
                })}
                placeholder="you@example.com"
                className={`w-full bg-white border-2 border-black p-4 rounded-2xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all placeholder:text-gray-300 ${
                  errors.email ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,0.2)]" : ""
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 px-1">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-black px-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                placeholder="••••••••"
                className={`w-full bg-white border-2 border-black p-4 rounded-2xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all placeholder:text-gray-300 ${
                  errors.password ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,0.2)]" : ""
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 px-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-xs font-black uppercase tracking-widest text-black px-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
                placeholder="••••••••"
                className={`w-full bg-white border-2 border-black p-4 rounded-2xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all placeholder:text-gray-300 ${
                  errors.confirmPassword ? "border-red-500 shadow-[4px_4px_0px_rgba(239,68,68,0.2)]" : ""
                }`}
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1 px-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="w-full bg-black text-white font-black uppercase py-5 rounded-2xl border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {isLoading ? "Registering..." : "Create Account"}
            </button>

            <div className="text-center pt-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Already have an account?{" "}
                <Link to="/login" className="text-black font-black border-b-2 border-black ml-1">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
