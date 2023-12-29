"use client"

import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import Navbar from '@/app/components/template/slidebar/Navbar';
import { usePathname } from 'next/navigation';
import Complex from '@/app/components/template/slidebar/top/menu/Complex';
import Basic from '@/app/components/template/slidebar/top/menu/Basic';

export default function BasicLayout( { children }: { children: ReactNode } ) {
  const path = usePathname()
  const slug = path.split( "/" ).pop() ?? ""
  return ( <>
      <Navbar/>
      <div className="pt-20 p-5"
           data-test={ 'test-master' }

      >
        { path.includes( "table" ) || path.includes( "orderan" )
          ? <Complex slug={ slug }/>
          : path.includes( 'list' ) || path.includes( 'create' ) ? <Basic pathname={ path }/> : null }
        { children }
      </div>
      <ToastContainer/>
    </>

  );
}

