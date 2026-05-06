import { useMutation } from "@tanstack/react-query";
import { getAllCertificates, deleteCertificate, createCertificate } from "../../../../services/index/certificates";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDataTable } from "../../../../hooks/useDataTable";
import DataTable from "../../components/DataTable";

const ManageCertificates = () => {
  const navigate = useNavigate();
  const {
    userState,
    currentPage,
    searchKeyword,
    data: certificatesData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllCertificates(searchKeyword, currentPage, 10),

    dataQueryKey: "certificates",
    deleteDataMessage: "Certificate is deleted",
    mutateDeleteFn: ({ id, token }) => {
      return deleteCertificate({
        id,
        token,
      });
    },
  });

  const { mutate: mutateCreateCertificate, isLoading: isLoadingCreateCertificate } = useMutation({
    mutationFn: ({ token }) => createCertificate({ token }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["certificates"]);
      toast.success("Certificate slot is created, edit that now! 🎉");
      navigate(`/admin/certificates/manage/edit/${data._id}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreateNewCertificate = () => {
    mutateCreateCertificate({ token: userState.userInfo.token });
  };

  return (
    <DataTable
      pageTitle="Manage Certificates"
      dataListName="Certificates"
      searchInputPlaceHolder="Certificate title..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={["Title", "Issuer", "Date", "Action"]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={certificatesData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={certificatesData?.headers}
      userState={userState}
      actionButton={
        <button
          disabled={isLoadingCreateCertificate}
          onClick={handleCreateNewCertificate}
          className="w-full md:w-auto bg-black text-white px-6 py-4 rounded-2xl font-black uppercase text-sm border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50"
        >
          {isLoadingCreateCertificate ? "Creating..." : "Add New Certificate"}
        </button>
      }
    >
      {certificatesData?.data?.map((cert) => (
        <tr key={cert._id} className="hover:bg-gray-50 transition-colors group">
          <td className="px-6 py-4">
            <span className="font-bold text-black group-hover:underline underline-offset-4 decoration-2">
              {cert.title}
            </span>
          </td>
          <td className="px-6 py-4">
            <span className="text-sm font-bold text-gray-600">{cert.issuer}</span>
          </td>
          <td className="px-6 py-4">
            <span className="text-xs font-bold text-gray-500 uppercase">{cert.date}</span>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <Link
                to={`/admin/certificates/manage/edit/${cert?._id}`}
                className="bg-black text-white px-4 py-2 rounded-lg font-bold text-xs border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,0.3)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                Edit
              </Link>
              <button
                disabled={isLoadingDeleteData}
                className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold text-xs border-2 border-red-600 shadow-[2px_2px_0px_rgba(220,38,38,0.3)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50"
                onClick={() => {
                  deleteDataHandler({
                    id: cert?._id,
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

export default ManageCertificates;
