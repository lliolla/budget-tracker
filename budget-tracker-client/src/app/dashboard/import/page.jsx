'use client'
import React, {useState} from 'react'
import * as XLSX from 'xlsx';
import axios from 'axios';



const page = () => {
 // State pour stocker le fichier sélectionné et les message d'erreur
 const [selectedFile, setSelectedFile] = useState(null);
 const [typeError, setTypeError] = useState(null);// ajouter la recuper des messegae error sucess
 const [uploadedData, setUploadedData] = useState(null);

//onchange event : see file's content on table
 const handleFileChange = (event) => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);
    console.log('File selected:', file)
    if (event.target.files.length === 0) {
        setTypeError('Merci de sélectionner un fichier');
        setUploadedData(null);
    } else {
     
        if (fileTypes.includes(file.type)) {
            setTypeError(null);
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = (e) => {
                console.log("Contenu du fichier Excel :", e.target.result);
                const workbook = XLSX.read(e.target.result, { type: 'buffer' });
                const worksheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetName];
                const data = XLSX.utils.sheet_to_json(worksheet);
                console.log("Données obtenues à partir du fichier Excel :", data);
                setUploadedData(data);
            }
        } else {
            setTypeError('Merci de sélectionner un fichier de type csv ou excel');
            setUploadedData(null);
        }
    }
 };
 

 // submit event
 const handleFileUpload = async () => {
   try {
     if (!selectedFile) {
        setTypeError('Merci de selectionner un fichier de type csv ou excel'); 
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
     setUploadedData(response.data);
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
             <form className='mb-10'>
                <label htmlFor="csv" className="block text-gray-700 text-sm font-bold mb-2">Importer votre fichier</label>
             <input
             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
             type="file" name="" 
             required
             onChange={handleFileChange}  />
              <div className="px-4 py-4-t flex items-center justify-end">
            <button
              className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              onClick={handleFileUpload}>Envoyer</button>
              {typeError && <span class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{typeError}</span>}
          </div>
          </form>
          {/* view content files */}
             <div>
             {uploadedData && uploadedData.length > 0 ? (
    <div>
        <p>Afficher le résultat de l'import</p>
        <table>
            <thead>
                <tr>
                    {Object.keys(uploadedData[0]).map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {uploadedData.slice(0, 10).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {Object.values(row).map((value, colIndex) => (
                            <td key={colIndex}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
) : (
    <div>Il n'y a pas de données à afficher</div>
)}
             </div>
             {/*list of files imported */}
            
           
             
         </div>
     </div>
    
      </main>
  )
}

export default page
