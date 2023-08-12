"use client"
import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '@/app/coba/notif/notif';

export default function Page() {

  return (
    <div>
      <button onClick={ notify }>Notify!</button>
      <ToastContainer/>
    </div>
  );
}