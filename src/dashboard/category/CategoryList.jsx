import React from "react";
import { useGetCategoryQuery } from "../../redux/features/category/categoryApi";

const CategoryList = () => {
  const { data } = useGetCategoryQuery();
  console.log(data);
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Category List
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-left">
          {/* Table Head */}
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Description
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">
                Image
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 text-center">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          {data?.data?.map((item) => (
            <tbody key={item._id}>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-1 font-medium text-gray-900">
                  {item.name}
                </td>

                <td className="px-4 py-1 text-gray-600 text-sm">
                  {item.description}
                </td>

                <td className="px-4 py-2">
                  <img
                    src={item.image}
                    alt="category"
                    className="h-10 w-10 rounded object-cover border"
                  />
                </td>

                <td className="px-4 py-2 flex justify-center items-center gap-2">
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Update
                  </button>
                  <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
