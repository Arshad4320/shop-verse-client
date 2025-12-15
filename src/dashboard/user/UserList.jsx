import React, { useState } from "react";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "../../redux/features/auth/authApi";
import { Loader } from "../../components/Loader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router";
import DeleteModal from "../../components/DeleteModal";
import { toast } from "react-toastify";

const UserList = () => {
  //  useUpdateUserMutation,
  //   useDeleteUserMutation,

  const [isOpen, setIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const { data, isLoading, isError } = useGetAllUserQuery();
  const [deleteUser] = useDeleteUserMutation();

  const users = data?.data || [];
  const openModal = (item) => {
    setDeleteItem(item);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const result = await deleteUser(deleteItem).unwrap();
      toast.success(result.message);
      setIsOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Failed to load users!
      </div>
    );
  }

  return (
    <div className="   p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-5">User List</h2>

      {users.length === 0 ? (
        <p className="text-gray-600 text-center">No users found!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border-b">#</th>
                <th className="text-left p-3 border-b">Name</th>
                <th className="text-left p-3 border-b">Email</th>
                <th className="text-left p-3 border-b">Role</th>
                <th className="text-left p-3 border-b">Status</th>
                <th className="text-left p-3 border-b">Change Type</th>
                <th className="text-center p-3 border-b">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-all border-b"
                >
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-medium">{user?.name || "No Name"}</td>

                  <td className="p-3 text-gray-600">{user?.email}</td>

                  <td className="p-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        user.userType === "Admin"
                          ? "bg-purple-600"
                          : "bg-blue-600"
                      }`}
                    >
                      {user.userType}
                    </span>
                  </td>

                  <td className="p-3">
                    {user.isBlocked ? (
                      <span className="px-2 py-1 bg-red-500 text-white rounded text-sm">
                        Blocked
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-600 text-white rounded text-sm">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="p-3    cursor-pointer">
                    <Link to={`/dashboard/edit-user/${user?._id}`}>
                      <button className="  px-2 py-1 rounded text-white bg-primary text-sm">
                        {/* <FaEdit size={24} /> */}
                        Make Admin
                      </button>
                    </Link>
                  </td>
                  <td className=" text-center">
                    <button
                      onClick={() => openModal(user?._id)}
                      className=" py-1  text-danger cursor-pointer"
                    >
                      <MdDelete size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <DeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Confirmation"
        message={`Are you sure you want to delete "${deleteItem}"?`}
      />
    </div>
  );
};

export default UserList;
