import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, itemId, children }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleClose = () => {
        setModalOpen(false);
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            setModalOpen(true);
            console.log("itemId", itemId);
        } else {
            setModalOpen(false);
            console.log("itemId", itemId);
        }
    }, [isOpen]);


  

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${modalOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="absolute bg-white rounded-lg p-8 shadow-lg">
                
                <div className="mt-6 flex justify-center gap-x-4">
                {children}
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
