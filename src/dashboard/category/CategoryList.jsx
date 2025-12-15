import React, { useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../redux/features/category/categoryApi";
import { Link } from "react-router";
import DeleteModal from "../../components/DeleteModal";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const CategoryList = () => {
  const { data, isLoading } = useGetCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  // const mappingData = data?.data?.map((item) => item._id);

  const [isOpen, setIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const openModal = (item) => {
    setDeleteItem(item);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const result = await deleteCategory(deleteItem).unwrap();

      toast.success(result.message);
      setIsOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };
  if (isLoading) return <Loader />;
  if (!data?.data || data?.data.length === 0) {
    return (
      <Link to="/dashboard/add-category" className="text-primary underline">
        Back To Add Category
      </Link>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Category List
      </h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full  border border-gray-300 text-left">
          {/* Table Head */}
          <thead className="bg-gray-200 text-center">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300">
                Name
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300">
                Description
              </th>

              <th className="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300">
                Image
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 text-center">
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.data.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 border border-gray-300 text-center"
              >
                <td className="px-4 py-2 text-gray-900 border border-gray-300">
                  {item.name}
                </td>
                <td className="px-4 py-2 text-gray-900 border border-gray-300">
                  {item.description.slice(0, 60)}
                </td>

                <td className="px-4 py-2 flex justify-center items-center border border-gray-300">
                  <img
                    src={item.image}
                    alt="category"
                    className="h-10 w-10 rounded object-cover border"
                  />
                </td>
                <td className="space-x-2 ">
                  <Link to={`/dashboard/edit-category/${item._id}`}>
                    <button className="   text-primary cursor-pointer">
                      <FaEdit size={24} />
                    </button>
                  </Link>

                  <button
                    onClick={() => openModal(item?._id)}
                    className="   text-danger cursor-pointer"
                  >
                    <MdDelete size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

export default CategoryList;
