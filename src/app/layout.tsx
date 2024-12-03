import { Metadata } from 'next'
import './globals.css'
import './flag.css';

// import Navbar from '@/app/components/layouts/Navbar';
// import { Slidebar } from '@/app/components/layouts/Slidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',

}

export default function RootLayout( {
  children,
}: {

  children: React.ReactNode

} ) {

  return (
    <html lang="en">
    <body>
    <div className={ "  " }>
      {/*<Navbar/>*/}
      <div className={ "flex " }>
        {/*<Slidebar/>*/}
        <div className=" w-[89%]">
          { children }
          <ToastContainer/>
        </div>
      </div>
    </div>
    </body>
    </html>
  )
}
