import React, { useState, useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  id: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <>
      {isModalOpen && (
        <div
          className={`transition-opacity fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "opacity 0.3s" }}
        >
          <div
            ref={modalRef}
            className={`flex justify-center items-center transition-transform bg-white p-4 rounded-lg w-3/5 h-3/5 relative ${
              isOpen ? "scale-100" : "scale-0"
            }`}
            style={{ pointerEvents: "auto", transition: "transform 0.3s" }}
          >
            <input type="hidden" id="id" value={id.id} disabled />
            <button
              className="absolute top-0 right-2 m-2 text-gray-500"
              onClick={closeModal}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
