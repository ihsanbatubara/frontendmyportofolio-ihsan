import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
  deleteUser,
  getAllUsers,
  updateProfile,
} from "../../../../services/index/users";
import DataTable from "../../components/DataTable";
import { images, stables } from "../../../../constants";

const Users = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: usersData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () =>
      getAllUsers(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "users",
    deleteDataMessage: "User is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteUser({
        slug,
        token,
      });
    },
  });

  const { mutate: mutateUpdateUser, isLoading: isLoadingUpdateUser } =
    useMutation({
      mutationFn: ({ isAdmin, userId }) => {
        return updateProfile({
          token: userState.userInfo.token,
          userData: { admin: isAdmin },
          userId,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["users"]);
        toast.success("User is updated");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleAdminCheck = (event, userId) => {
    const initialCheckValue = !event.target.checked;

    if (
      window.confirm("Do you want to change the admin status of this user?")
    ) {
      mutateUpdateUser({ isAdmin: event.target.checked, userId });
    } else {
      event.target.checked = initialCheckValue;
    }
  };

  return (
    <DataTable
      pageTitle="Manage Users"
      dataListName="Users"
      searchInputPlaceHolder="User's email..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Name",
        "Email",
        "Created At",
        "is Verified",
        "is Admin",
        "ACTION",
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={usersData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={usersData?.headers}
      userState={userState}
    >
      {usersData?.data.map((user) => (
        <tr key={user._id} className="hover:bg-gray-50 transition-colors group">
          <td className="px-6 py-4">
            <div className="flex items-center gap-4">
              <img
                src={user?.avatar ? user?.avatar : "/images/user.png"}
                alt={user?.name || "Default User"}
                className="w-12 h-12 rounded-xl object-cover border-2 border-black shadow-[2px_2px_0px_#000]"
              />
              <span className="font-bold text-black group-hover:underline underline-offset-4 decoration-2">
                {user.name}
              </span>
            </div>
          </td>
          <td className="px-6 py-4">
            <span className="text-sm font-bold text-gray-500">{user.email}</span>
          </td>
          <td className="px-6 py-4 font-bold text-gray-600 text-sm">
            {new Date(user.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </td>
          <td className="px-6 py-4">
            <span className={`inline-block px-3 py-1 rounded-full border-2 border-black font-black text-[10px] uppercase ${user.verified ? "bg-green-400" : "bg-red-400"}`}>
              {user.verified ? "Verified" : "Unverified"}
            </span>
          </td>
          <td className="px-6 py-4">
            <input
              type="checkbox"
              className="w-5 h-5 border-2 border-black rounded bg-white checked:bg-black transition-all cursor-pointer"
              defaultChecked={user.admin}
              onChange={(event) => handleAdminCheck(event, user._id)}
              disabled={isLoadingUpdateUser}
            />
          </td>
          <td className="px-6 py-4">
            <button
              disabled={isLoadingDeleteData}
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold text-xs border-2 border-red-600 shadow-[2px_2px_0px_rgba(220,38,38,0.3)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50"
              onClick={() => {
                deleteDataHandler({
                  slug: user?._id,
                  token: userState.userInfo.token,
                });
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default Users;
