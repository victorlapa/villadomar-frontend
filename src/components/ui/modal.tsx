import React, { useState, useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeModal();
            }
        };

        if (isModalOpen) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isModalOpen]);

    const closeModal = () => {
        setIsModalOpen(false);
        onClose();
    };

    return (
        <>
            {isModalOpen && (
                <div className={`transition ease-in-out delay-150 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <div ref={modalRef} className="bg-white p-4 rounded-lg w-3/5 h-3/5 relative" style={{ pointerEvents: 'auto' }}>
                        <button className="absolute top-0 right-2 m-2 text-gray-500" onClick={closeModal}>
                            X
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default modal;