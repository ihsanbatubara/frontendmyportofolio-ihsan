import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { getAllExperiences, updateExperience } from "../../../../services/index/experiences";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const EditExperience = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#EA4C89");

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllExperiences(),
    queryKey: ["experiences"],
    onSuccess: (data) => {
      const exp = data.find((item) => item._id === id);
      if (exp) {
        setTitle(exp.title);
        setCompany(exp.company);
        setLocation(exp.location);
        setStartDate(exp.startDate);
        setEndDate(exp.endDate);
        setDescription(exp.description);
        setColor(exp.color);
      }
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateExperience, isLoading: isLoadingUpdate } = useMutation({
    mutationFn: ({ token, experienceData, id }) => {
      return updateExperience({ token, experienceData, id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["experiences"]);
      toast.success("Experience updated successfully! 🎉");
      navigate("/admin/experiences/manage");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdateExperience = () => {
    mutateUpdateExperience({
      token: userState.userInfo.token,
      id,
      experienceData: {
        title,
        company,
        location,
        startDate,
        endDate,
        description,
        color,
      },
    });
  };

  return (
    <div className="container mx-auto max-w-2xl p-10 bg-white border-4 border-black rounded-[40px] shadow-[16px_16px_0px_rgba(0,0,0,0.1)] mb-20">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : isError ? (
        <div className="text-center text-red-500">Error fetching data</div>
      ) : (
        <div className="space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Edit Experience</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Job Title</label>
              <input type="text" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Company</label>
              <input type="text" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Start Year</label>
              <input type="text" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">End Year</label>
              <input type="text" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Location</label>
              <input type="text" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Accent Color</label>
              <div className="flex gap-4 items-center">
                <input type="color" className="w-16 h-14 bg-white border-2 border-black p-1 rounded-xl cursor-pointer" value={color} onChange={(e) => setColor(e.target.value)} />
                <span className="font-bold text-sm">{color}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Description</label>
            <textarea rows="4" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <button 
            onClick={handleUpdateExperience} 
            disabled={isLoadingUpdate}
            className="w-full bg-black text-white font-black uppercase py-5 rounded-2xl border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoadingUpdate ? "Updating..." : "Update Experience"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EditExperience;
