import { useMutation } from "@tanstack/react-query";
import { getAllExperiences, deleteExperience, createExperience } from "../../../../services/index/experiences";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDataTable } from "../../../../hooks/useDataTable";
import DataTable from "../../components/DataTable";

const ManageExperiences = () => {
  const navigate = useNavigate();
  const {
    userState,
    currentPage,
    searchKeyword,
    data: experiencesData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllExperiences(),
    dataQueryKey: "experiences",
    deleteDataMessage: "Experience is deleted",
    mutateDeleteFn: ({ id, token }) => {
      return deleteExperience({
        id,
        token,
      });
    },
  });

  const { mutate: mutateCreateExperience, isLoading: isLoadingCreateExperience } = useMutation({
    mutationFn: ({ token, experienceData }) => createExperience({ token, experienceData }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["experiences"]);
      toast.success("Experience is created, edit that now! 🎉");
      navigate(`/admin/experiences/manage/edit/${data._id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreateNewExperience = () => {
    mutateCreateExperience({ 
        token: userState.userInfo.token, 
        experienceData: {
            title: "New Experience",
            company: "Company Name",
            location: "Location",
            startDate: "2023",
            endDate: "Present",
            description: "Describe your work here...",
            color: "#EA4C89"
        }
    });
  };

  return (
    <DataTable
      pageTitle="Manage Experiences"
      dataListName="Experiences"
      searchInputPlaceHolder="Experience title..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={["Company", "Title", "Duration", "Location", "Action"]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={experiencesData}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      userState={userState}
      actionButton={
        <button
          disabled={isLoadingCreateExperience}
          onClick={handleCreateNewExperience}
          className="w-full md:w-auto bg-black text-white px-6 py-4 rounded-2xl font-black uppercase text-sm border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50"
        >
          {isLoadingCreateExperience ? "Creating..." : "Add New Experience"}
        </button>
      }
    >
      {experiencesData?.map((exp) => (
        <tr key={exp._id} className="hover:bg-gray-50 transition-colors group">
          <td className="px-6 py-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-4 h-4 rounded-full border border-black" 
                style={{ backgroundColor: exp.color || "#EA4C89" }}
              ></div>
              <span className="font-bold text-black group-hover:underline underline-offset-4 decoration-2">
                {exp.company}
              </span>
            </div>
          </td>
          <td className="px-6 py-4">
            <span className="text-sm font-bold text-gray-600">{exp.title}</span>
          </td>
          <td className="px-6 py-4">
            <span className="text-xs font-bold text-gray-500 uppercase">{exp.startDate} - {exp.endDate}</span>
          </td>
          <td className="px-6 py-4">
            <span className="text-sm font-bold text-gray-600">{exp.location}</span>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <Link
                to={`/admin/experiences/manage/edit/${exp?._id}`}
                className="bg-black text-white px-4 py-2 rounded-lg font-bold text-xs border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                Edit
              </Link>
              <button
                disabled={isLoadingDeleteData}
                className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold text-xs border-2 border-red-600 shadow-[2px_2px_0px_rgba(220,38,38,0.3)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50"
                onClick={() => {
                  deleteDataHandler({
                    id: exp?._id,
                    token: userState.userInfo.token,
                  });
                }}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default ManageExperiences;
