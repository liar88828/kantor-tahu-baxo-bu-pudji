"use client"

import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '@/app/components/template/slidebar/Navbar';

export default function HomeLayout( { children }: { children: ReactNode } ) {
  return ( <>
      <Navbar/>
      <div className="pt-14">
        { children }
      </div>
      <ToastContainer/>
    </>

  );
}

