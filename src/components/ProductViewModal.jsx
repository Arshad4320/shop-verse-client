const ProductViewModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  px-4 sm:px-0">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <div className="relative bg-white rounded shadow w-full max-w-lg p-6 mt-20 mb-10">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {order.item.map((product) => (
            <div key={product._id} className="flex gap-3 border-b pb-3">
              <img
                src={product?.product?.image}
                className="w-16 h-16 rounded object-cover"
              />
              <div>
                <p className="font-semibold text-sm">
                  {product?.product?.name}
                </p>
                <p>Qty: {product?.quantity}</p>
                <p>Price: ৳ {Math.ceil(product.price)}</p>
              </div>
            </div>
          ))}

          {/* Grand Total */}
          <div className="font-bold text-center">
            Grand Total: ৳{" "}
            {order.item.reduce(
              (sum, product) =>
                sum + Math.ceil(product.price) * product.quantity,
              0
            )}
          </div>
        </div>

        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductViewModal;
