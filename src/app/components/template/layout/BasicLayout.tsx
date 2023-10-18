"use client"

import React, { ReactNode } from 'react';
import Navbar from '@/app/components/template/layout/Navbar';
import { ToastContainer } from 'react-toastify';

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

