import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, itemId }) => {
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setModalOpen(true);
        } else {
            setModalOpen(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setModalOpen(false);
        onClose();
    };

    const handleSignOut = () => {
        // Mettez ici la logique pour la déconnexion
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${modalOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="absolute bg-white rounded-lg p-8 shadow-lg">
                <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500">
                    <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                    </svg>
                </span>

                <h3 className="mb-2 text-2xl font-bold text-gray-800">Sign out</h3>
                <p className="text-gray-500">
                    Are you sure you would like to sign out of your account?
                </p>

                <div className="mt-6 flex justify-center gap-x-4">
                    <button
                        onClick={handleSignOut}
                        className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
                    >
                        Sign out
                    </button>
                    <button
                        onClick={handleClose}
                        type="button"
                        className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
