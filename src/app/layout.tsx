import { Metadata } from 'next'
import './globals.css'
import { Slidebar } from '@/app/component/Slidebar';
import './flag.css';
import Navbar from '@/app/component/Navbar';

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
    <html lang="en"

    >

    <body>
    <div className={ " bg-green-50" }>
      <Navbar/>
      <div className={ "flex " }>
        <Slidebar/>
        <div className=" w-[89%] sm:w-[95%] ">
          { children }
        </div>
      </div>
    </div>
    </body>
    </html>
  )
}
