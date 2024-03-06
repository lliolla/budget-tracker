'use client'
//import { useRouter } from 'next/router'
import React from 'react'
// const router = useRouter();
// const id = router.query.id

const UpdateTransactionForm = ({id}) => {
 console.log("id",id)
  return (
  
    <div className="  mb-2 my-2 flex flex-col w-72 overflow-y-auto max-h-[80vh]">
   <h2 className='text-lg text-slate-50 font-semibold uppercase p-2 mb-5 text-center bg-cyan-600'> modifier une transaction</h2>   
   
    <form class="relative  flex flex-col justify-center">
    <label className="uppercase tracking-wide text-sm font-semibold text-gray-900 mb-2 pt-2" htmlFor="grid-last-name">
      Description
    </label>
    <input className="  p-2 w-full block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded " id="grid-last-name" type="text" placeholder="Doe" />

    <label className="uppercase tracking-wide text-sm font-semibold text-gray-900 mb-2 pt-2 " htmlFor="grid-password">
    Montant
    </label>
    <input className="a  p-2 w-full block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded" id="grid-password" type="text" placeholder="******************" />

    <label className="uppercase tracking-wide text-sm font-semibold text-gray-900 mb-2 pt-2" htmlFor="grid-city">
   Vendeur
    </label>
    <input className="  p-2 w-full block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded " id="grid-city" type="text" placeholder="Albuquerque" />


   
  <label for="type" class="uppercase tracking-wide text-sm font-semibold text-gray-900 mb-2 pt-2">Type </label>
  <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>A classer</option>
    <option>Dépense </option>
    <option>Recette</option>
  </select>


  <label for="type" class="uppercase tracking-wide text-sm font-semibold text-gray-900 mb-2 pt-2">Categories </label>
  <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>A classer</option>
    <option>Alimentation </option>
    <option>Loisirs</option>
  </select>

    

  <label for="type" className="uppercase tracking-wide text-sm font-semibold text-gray-900 mb-2 pt-2">Sous catégories </label>
  <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option selected>A classer</option>
    <option>Restaurent </option>
    <option>Assurance</option>
  </select>
</form>
  </div>
  )
}

export default UpdateTransactionForm