import React from "react";
import { useGetAllUserQuery } from "../../redux/features/auth/authApi";

const UserList = () => {
  const { data, isLoading, isError } = useGetAllUserQuery();
  console.log(data?.data);
  const users = data?.data || [];

  if (isLoading) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Loading Users...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Failed to load users!
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
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
                        user.role === "admin" ? "bg-purple-600" : "bg-blue-600"
                      }`}
                    >
                      {user.role}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
