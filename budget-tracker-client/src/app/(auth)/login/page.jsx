"use client"
 /**
  * This function handles form submission, prevents default behavior, sends a
  * POST request to the specified API endpoint, retrieves the token from the
  * response, and navigates to the dashboard upon successful login. It also
  * handles and logs any errors that occur during the process.
  *
  * @param {event} e - the event object triggering the form submission
  * @return {Promise} - a Promise that resolves when the function completes
  */

import React, { useState } from 'react';
import axios from 'axios';
import {useRouter} from 'next/navigation'

const Login = () => {

  const [loginName, setLoginName] = useState('');
  const [loginPwd, setLoginPwd] = useState('');
 // const [token, setToken] = useState(getToken());
 const router =useRouter()
 const submit = async (e) => {
    e.preventDefault(); // to prevent the default form behavior of refreshing the page on submission
    try {
      const response = await axios.post('http://localhost:5050/api/v1/auth/login', {
        name: loginName,
        password: loginPwd
      });
      console.log('res', response.data);
     // Récupère le token depuis la réponse de l'API
    const userToken = response.data.token;
    localStorage.setItem('token', userToken); // Store the token in localStorage
      router.push('/dashboard');
    } catch (error) {
      console.log('err',error);
      // Handle the error or display a custom error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center px-20 h-screen">
      <div className="flex-1 rounded-lg bg-gray-100 px-6 pb-4 pt-8">
        <h1 className="mb-16 text-2xl text-center">
          Connectez vous pour gérer vos comptes
        </h1>
        <form className="space-y-6" action="#" method="POST">
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="name"
              >
                Nom *
              </label>
              <input
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
               
                required
                onChange={(e) => setLoginName(e.target.value)}
              />
            </div>
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Mot de passe *
              </label>
              <input
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
               
                required
                minLength={6}
                onChange={(e) => setLoginPwd(e.target.value)}
              />
            </div>
            <button 
            type="submit"
            onClick={submit} 
            className="w-full py-2 mt-10 px-4 text-center bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none">
              Login
            </button>
          </div>
        </form>
        <div className='text-center py-10'><a href="#" className="py-10 font-semibold hover:text-indigo-500">
                Mot de passe oublié?
              </a></div>
      </div>
    </div>
  );
};

export default Login;