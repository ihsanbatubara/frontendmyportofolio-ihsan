import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { getSingleCertificate, updateCertificate } from "../../../../services/index/certificates";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { HiOutlineCamera } from "react-icons/hi";

const EditCertificate = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [photo, setPhoto] = useState(null);
  const [initialPhoto, setInitialPhoto] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSingleCertificate({ id }),
    queryKey: ["certificates", id],
    onSuccess: (data) => {
      setTitle(data.title);
      setIssuer(data.issuer);
      setDate(data.date);
      setLink(data.link);
      setInitialPhoto(data.photo);
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateCertificate, isLoading: isLoadingUpdate } = useMutation({
    mutationFn: ({ token, formData, id }) => {
      return updateCertificate({ token, formData, id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["certificates"]);
      toast.success("Certificate updated successfully! 🎉");
      navigate("/admin/certificates/manage");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdateCertificate = () => {
    const formData = new FormData();
    if (photo) {
      formData.append("certificatePicture", photo);
    }
    formData.append(
      "document",
      JSON.stringify({ title, issuer, date, link })
    );

    mutateUpdateCertificate({
      token: userState.userInfo.token,
      id,
      formData,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  return (
    <div className="container mx-auto max-w-2xl p-10 bg-white border-4 border-black rounded-[40px] shadow-[16px_16px_0px_rgba(0,0,0,0.1)] mb-20">
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : isError ? (
        <div className="text-center text-red-500">Error fetching data</div>
      ) : (
        <div className="space-y-8">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Edit Certificate</h2>

          {/* Photo Upload Area */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="relative group">
              <div className="w-64 aspect-[4/3] border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_#000]">
                {photo ? (
                  <img src={URL.createObjectURL(photo)} alt="Preview" className="w-full h-full object-cover" />
                ) : initialPhoto ? (
                  <img src={initialPhoto} alt="Initial" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <HiOutlineCamera className="text-4xl text-gray-400" />
                  </div>
                )}
              </div>
              <label className="absolute bottom-4 right-4 bg-yellow-300 border-2 border-black p-3 rounded-xl cursor-pointer shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                <HiOutlineCamera className="text-xl" />
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">Click icon to upload image</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Certificate Title</label>
              <input type="text" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Issuer (e.g. Google, Udemy)</label>
              <input type="text" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={issuer} onChange={(e) => setIssuer(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Date (e.g. Dec 2023)</label>
              <input type="text" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-1">Credential Link (URL)</label>
              <input type="text" className="w-full bg-white border-2 border-black p-4 rounded-xl font-bold text-black focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-all" value={link} onChange={(e) => setLink(e.target.value)} />
            </div>
          </div>

          <button 
            onClick={handleUpdateCertificate} 
            disabled={isLoadingUpdate}
            className="w-full bg-black text-white font-black uppercase py-5 rounded-2xl border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoadingUpdate ? "Updating..." : "Update Certificate"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EditCertificate;
