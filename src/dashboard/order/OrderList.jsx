import React, { useEffect, useState } from "react";
import {
  useDeleteOrderMutation,
  useGetQueryOrderQuery,
} from "../../redux/features/order/order";
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ProductViewModal from "../../components/ProductViewModal";
import { toast } from "react-toastify";

const OrderList = () => {
  const [deleteItem] = useDeleteOrderMutation();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    data: orders,
    isLoading,
    isError,
  } = useGetQueryOrderQuery({
    page,
    search,
  });
  console.log(orders?.data);
  const totalPage = orders?.data?.meta?.totalPage;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteItem(id).unwrap();
      toast.success(result?.message);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Orders List</h2>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by phone or customer name"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="w-full border p-2 rounded border-primary mb-5"
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full  border border-gray-300 text-left">
          <thead className="bg-gray-200 text-center">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300">
                SL
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300">
                Customer
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300">
                Items
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300">
                Phone
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300">
                Address
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300">
                Payment
              </th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders?.data?.result?.map((order, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 border border-gray-300 text-center"
              >
                <td className="px-4 py-2 border border-gray-300">
                  {(page - 1) * 10 + index + 1}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {order?.address?.name || order?.user?.name}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {order?.item?.length}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {order?.address?.phone || order?.user?.phone}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  {(order?.address?.upozilla || order?.user?.upozilla) +
                    ", " +
                    (order?.address?.zila || order?.user?.zila)}
                </td>

                <td className="px-4 py-2 border border-gray-300">
                  <span
                    className={`px-2 py-1 text-xs rounded text-white ${
                      order.paymentStatus === "Paid"
                        ? "bg-success"
                        : "bg-warning"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>

                <td className=" py-2 flex justify-center items-center gap-2 ">
                  <button
                    onClick={() => openModal(order)}
                    className="text-purple-600 text-xl hover:text-purple-800"
                  >
                    <FaRegEye />
                  </button>

                  <button
                    onClick={() => handleDelete(order?._id)}
                    className="text-red-600 text-xl hover:text-red-800"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-1 bg-primary text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-1 bg-primary text-white rounded">{page}</span>

        <button
          disabled={page === totalPage}
          onClick={() => setPage(page + 1)}
          className="px-4 py-1 bg-primary text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <ProductViewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default OrderList;
