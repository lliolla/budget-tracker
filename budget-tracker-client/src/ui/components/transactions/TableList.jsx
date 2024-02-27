'use client'
import React, { useState } from 'react'
import { format } from 'date-fns';
   
import { RiDeleteBin5Line ,RiPencilLine,RiAddLine} from "react-icons/ri";
import Modal from 'ui/components/modal';
import UpdateTransaction from 'ui/components/transactions/FormTransaction';


const TableList = ({transactions}) => {
    // Formatage de la date au format "jj mm aa"
    const formatDate = (date) => {
        return format(new Date(date), 'dd MM yy');
    };
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [actionType, setActionType] = useState(null);
    const [titleModal , setTitleModal] = useState(null);

    const openEditModal = (id) => {
        setSelectedItemId(id);
        setActionType('edit');
        setTitleModal('Modifier une transaction');
        console.log("setActionType", titleModal,actionType);
      };
      const openCreateModal = (id) => {
        setSelectedItemId(id);
        setTitleModal('Créer une transaction');
        setActionType('edit');
        console.log("setActionType",  titleModal,actionType);
      };

      const openDeleteModal = (id) => {
        setSelectedItemId(id);
        setActionType('delete')
        console.log("setActionType", setActionType);
      };

      const closeModals = () => {
        setSelectedItemId(null);
        setActionType(null)
      };
     const handleDeleteConfirmation = () => {
         console.log("suppression confirmée");
         closeModals();
     }
    
  return (
    <main className="antialiased font-sans bg-gray-200">
    <div className="container mx-auto px-4 sm:px-8">
        {/*tableau */}
        <div className="py-8">
            <div>
                <h2 className="text-2xl font-semibold leading-tight">Liste des dépenses </h2>
            </div>
            <div className="my-2 flex sm:flex-row flex-col">
                <div className="flex flex-row mb-1 sm:mb-0">
                    <div className="relative">
                        <select
                            className="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                    <div className="relative">
                        <select
                            className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                            <option>All</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
                {/* bandeau  Search */}
                <div className="block relative">
                    <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                            <path
                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                            </path>
                        </svg>
                    </span>
                    <input placeholder="Search"
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                    
                </div>
                <span
                                        className="relative inline-block mx-2 px-2 py-2 font-semibold text-green-900 leading-tight"
                                        onClick={openCreateModal}>
                                        <span aria-hidden
                                            className=" absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative"><RiAddLine /></span>
                                    </span>  
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className='odd:bg-white even:bg-slate-50' >
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-w-xs truncate">
                                    Catégorie
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-w-xs truncate ">
                                  Sous categorie 
                                </th>
                                <th
                                    className=" items-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider  max-w-xs truncate">
                                    Date
                                    
                                </th>
                                <th
                                 
                                    className="w-6 px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider  max-w-xs truncate">
                                    description
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-w-xs truncate">
                                    Montant
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-w-xs truncate">
                                   Type
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-w-xs truncate">
                                   Vendeur
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                               Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction._id } > 
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className='flex items-center'>
                                        <div className="flex-shrink-0 w-8 h-8">
                                            <img className="w-full h-full rounded-full"
                                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {transaction.categoryId ? transaction.categoryId.title : ''}
                                            </p>
                                        </div>
                                        </div>
                                    </td>  
                                    <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                        <div className="flex-shrink-0 w-8 h-8">
                                            <img className="w-full h-full rounded-full"
                                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                            {transaction.categoryId ? transaction.subcategoryId.title : ''}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {formatDate(transaction.date)}
                                    </p>
                                </td>
                                <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {transaction.Libellé}
                                    </p>
                                  
                                </td>
                                <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                    <p>{transaction.Montant.$numberDecimal.toString()} €</p>
                                </td>
                                <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                    <p>{transaction.type}</p>
                                </td>
                                <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                    <p>{transaction.seller}</p>
                                </td>
                                <td className=" px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                   <div className="flex "> 
                                   <span
                                        className="relative inline-block mx-2 px-2 py-2 font-semibold text-green-900 leading-tight"
                                        onClick={openEditModal}>
                                        <span aria-hidden
                                            className=" absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative"><RiPencilLine /></span>
                                    </span>  
                                    <span
                                        className="relative inline-block mx-2 px-2 py-2 font-semibold text-red-900 leading-tight"
                                        onClick={openDeleteModal}>
                                        <span aria-hidden
                                            className="  absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                        <span className="relative"><RiDeleteBin5Line /></span>
                                    </span></div>
                                </td> 
                                </tr> 
                                  
                            ))}
                           
                        </tbody>
                    </table>
                    <div
                        className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span className="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                            <button
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
                            <button
                                className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      {/* Modal */}
    {selectedItemId && (
                <Modal isOpen={true} onClose={closeModals} itemId={selectedItemId}>
                    {actionType === 'edit' ? (
                        <UpdateTransaction id={selectedItemId} />
                    ) : actionType === 'delete' ? (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Confirmation de suppression</h2>
                            <p>Êtes-vous sûr de vouloir supprimer cette transaction ?</p>
                            <div className="flex mt-4">
                                <button onClick={handleDeleteConfirmation} className="mr-4 bg-red-500 text-white px-4 py-2 rounded-md">Oui</button>
                                <button onClick={closeModals} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Non</button>
                            </div>
                        </div>
                    ) : null}
                </Modal>
            )}
     </main>
  )
}

export default TableList