"use client"
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
  const notify = () => toast.success( '🦄 Wow so easy!', {
    position       : "top-right",
    autoClose      : 5000,
    hideProgressBar: false,
    closeOnClick   : true,
    pauseOnHover   : true,
    theme          : "light",
  } );

  return (
    <div>
      <button onClick={ notify }>Notify!</button>
      <ToastContainer/>
    </div>
  );
}