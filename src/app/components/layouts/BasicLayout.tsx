"use client"
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import SlidebarNew from '@/app/components/layouts/SlidebarNew';

// const Slidebar       = dynamic( () => import('@/app/components/layouts/Slidebar'), { ssr: false } );
const Navbar         = dynamic( () => import('@/app/components/layouts/Navbar'), { ssr: false } );
const ToastContainer = dynamic( () => import('react-toastify').then( c => c.ToastContainer ), { ssr: false }
);

export default function HomeLayout( { children }: { children: ReactNode } ) {
  return ( <>
      <Navbar/>
      <SlidebarNew/>
      { children }
      <ToastContainer/>
    </>

  );
}

