const ProductViewModal = ({ isOpen, onClose, order }) => {
  console.log(order);
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Order Items</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Items Section */}
        <div className="space-y-4 max-h-72 overflow-y-auto">
          {order.item.map((product) => (
            <div key={product._id} className="flex gap-3">
              <img
                src={product?.images}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">
                  {product?.product?.name}
                </p>
                <p className="text-xs text-gray-600">
                  Quantity: {product?.quantity}
                </p>
                <p className="text-xs text-gray-700">
                  Price: ৳ {Math.ceil(product?.price)}
                </p>
                <p className="text-xs text-gray-700">Size:{product?.sizes}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border-t mt-5 pt-4 text-sm text-gray-700 space-y-1">
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-medium">৳ 130</span>
          </div>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium">
              ৳{" "}
              {order.item.reduce(
                (sum, p) => sum + Math.ceil(p.price) * p.quantity,
                0
              )}
            </span>
          </div>

          <div className="flex justify-between font-semibold text-gray-900 border-t pt-2 text-base">
            <span>Total</span>
            <span>
              ৳{" "}
              {order.item.reduce(
                (sum, p) => sum + Math.ceil(p.price) * p.quantity + Number(130),
                0
              )}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-right mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
