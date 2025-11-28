import React, { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import {
  useDeleteProductMutation,
  useGetProductQuery,
} from "../../redux/features/product/productApi";
import DeleteModal from "./../../components/DeleteModal";

const ProductList = () => {
  const { data } = useGetProductQuery();

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const openModal = (item) => {
    setDeleteItem(item);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const result = await deleteProduct(deleteItem).unwrap();
      toast.success(result.message);
      setIsOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  if (!data?.data || data?.data.length === 0) {
    return (
      <Link to="/dashboard/add-product" className="text-primary underline">
        Back To Add Product
      </Link>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Products List
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
                Price
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300">
                Quantity
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300">
                Category
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
            {data.data?.result?.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 border border-gray-300 text-center"
              >
                <td className="px-4 py-2 text-gray-900 border border-gray-300">
                  {item.name.slice(0, 40)}
                </td>
                <td className="px-4 py-2 text-gray-900 border border-gray-300">
                  {item.price}
                </td>
                <td className="px-4 py-2 text-gray-900 border border-gray-300">
                  {item.quantity}
                </td>
                <td className="px-4 py-2 text-gray-900 border border-gray-300">
                  {item?.categoryId?.name}
                </td>
                <td className="px-4 py-2 text-gray-600 text-sm border border-gray-300">
                  {item.description.slice(0, 80) + "...."}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <img
                    src={item.image}
                    alt="category"
                    className="h-10 w-10 rounded object-cover border"
                  />
                </td>
                <td className="px-4 py-2 flex justify-center items-center gap-2 ">
                  <Link to={`/dashboard/edit-product/${item._id}`}>
                    <button className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-purple-700">
                      Update
                    </button>
                  </Link>

                  <button
                    onClick={() => openModal(item._id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
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
        message={`Are you sure you want to delete "${deleteItem?.name}"?`}
      />
    </div>
  );
};

export default ProductList;
