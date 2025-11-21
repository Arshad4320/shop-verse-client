import React from "react";

const DeleteModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 " onClick={onClose}></div>

      {/* Modal */}
      <div
        className="
          relative bg-white rounded-xl shadow-xl w-full 
          max-w-sm sm:max-w-md md:max-w-lg 
          p-5 sm:p-6 md:p-7 
          animate-fadeIn
        "
      >
        {/* Title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3">
          {title}
        </h2>

        {/* Message */}
        <p className="text-sm sm:text-base text-gray-600 mb-6">{message}</p>

        {/* Buttons */}
        <div className="flex justify-end gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-sm sm:text-base"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-3 py-2 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm sm:text-base"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
