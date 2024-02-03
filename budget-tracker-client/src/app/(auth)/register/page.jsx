"use client"

import React, { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

const Register = () => {
  const [registerName, setregisterName] = useState('')
  const [registerPwd, setregisterPwd] = useState('')
  const [registerEmail, setregisterEmail] = useState('')
  const router =useRouter()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5050/api/v1/auth/register", {
        name: registerName,
        password: registerPwd,
        email: registerEmail,
       // isAdmin: "false"
      });
      console.log('res', response.data)
      router.push('/login')
    } catch (err) {
      console.error('err', err);
    }
  };
  

  


  return (
    <div className="flex items-center justify-center px-20 h-screen ">
      <div className="flex-1 rounded-lg bg-gray-100 px-6 pb-4 pt-8">
        <h1 className="mb-16  text-2xl text-center">
          Créer votre compte
        </h1>
        <form className="space-y-3" action="#" method="POST" onSubmit={handleSubmit}>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="name"
              >
                Nom *
              </label>
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Entrer votre nom"
                required
                onChange={(e) => setregisterName(e.target.value)}
              />
            </div>
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email *
              </label>
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                name="email"
                type="email"
                onChange={(e) => setregisterEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="Entrer votre email"
              />
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Mot de passe *
              </label>
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                name="password"
                type="password"
                onChange={(e) => setregisterPwd(e.target.value)}
                autoComplete="current-password"
                required
                minLength={6}
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-2 mt-10 px-4 text-center bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
        <p>Déja inscrit ? connectez-vous</p>
      </div>
    </div>
  );
};

export default Register;