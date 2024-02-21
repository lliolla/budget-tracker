'use client'
import React, {useState} from 'react'

import axios from 'axios';
const page = () => {
 // State pour stocker le fichier sélectionné
 const [selectedFile, setSelectedFile] = useState(null);

 // Fonction pour gérer la sélection de fichier
 const handleFileChange = (event) => {
   setSelectedFile(event.target.files[0]);
 };

 // Fonction pour envoyer le fichier au backend
 const handleFileUpload = async () => {
   try {
     if (!selectedFile) {
       console.error('No file selected');
       return;
     }

     const formData = new FormData();
     formData.append('file', selectedFile);

     const response = await axios.post('http://localhost:5050/api/v1/import', formData, {
       headers: {
         'Content-Type': 'multipart/form-data'
       }
     });

     console.log('File uploaded successfully:', response.data);
     // Réinitialiser le fichier sélectionné après l'envoi
     setSelectedFile(null);
   } catch (error) {
     console.error('Error uploading file:', error);
   }
 };
  return (
  
     <main className="antialiased font-sans bg-gray-200">
     <div className="container mx-auto px-4 sm:px-8">
       
         <div className="py-8">
             <div>
                 <h2 className="text-2xl font-semibold leading-tight pb-12">Gestion des fichiers d'import</h2>
             </div>
             {/*input import */}
             <div className='mb-10'>
                <label htmlFor="csv" className="block text-gray-700 text-sm font-bold mb-2">Importer votre fichier</label>
             <input
             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
             type="file" name="" 
             id=""
             onChange={handleFileChange}  />
              <div className="px-4 py-4-t flex items-center justify-end">
            <button
              className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
           
              onClick={handleFileUpload}
            //   disabled={!selectedFile}
              >Envoyer</button>
          </div>
          </div>
             {/*tableau */}
            
             <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                 <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                     <table className="min-w-full leading-normal">
                         <thead>
                             <tr className='odd:bg-white even:bg-slate-50' >
                                 <th
                                     className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-w-xs truncate">
                                     Période 
                                 </th>
                                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider max-w-xs truncate ">
                                  Descriptif
                                 </th>
                        
                                 <th
                                     className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Action
                                 </th>
                             </tr>
                         </thead>
                         <tbody>
                           
                                 <tr> 
                                     <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                         <div className='flex items-center'>
                                         <div className="flex-shrink-0 w-8 h-8">
                                             <img className="w-full h-full rounded-full"
                                                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                 alt="" />
                                         </div>
                                         <div className="ml-3">
                                             <p className="text-gray-900 whitespace-no-wrap">
                                             te
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
                                         te
                                             </p>
                                         </div>
                                     </div>
                                 </td>
                                 <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                     <p className="text-gray-900 whitespace-no-wrap">
                                   te
                                     </p>
                                 </td>
                                 <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                 <p className="text-gray-900 whitespace-no-wrap">
                                    te
                                     </p>
                                   
                                 </td>
                                 <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                     <p> €</p>
                                 </td>
                                 <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                     <p>o</p>
                                 </td>
                                 <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                     <p>p</p>
                                 </td>
                                 <td className=" px-4 py-4 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex "> 
                                    <span
                                         className="relative inline-block mx-2 px-2 py-2 font-semibold text-green-900 leading-tight"
                                         >
                                         <span aria-hidden
                                             className=" absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                         <span className="relative">p</span>
                                     </span>  
                                     <span
                                         className="relative inline-block mx-2 px-2 py-2 font-semibold text-red-900 leading-tight"
                                         >
                                         <span aria-hidden
                                             className="  absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                         <span className="relative">p</span>
                                     </span></div>
                                 </td> 
                                 </tr> 
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
    
      </main>
  )
}

export default page