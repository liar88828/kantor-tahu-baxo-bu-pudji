import { Metadata } from 'next'
import './globals.css'
import { Slidebar } from '@/app/component/Slidebar';
import './flag.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >
      <div className={"flex"}>

      <Slidebar/>
      { children }
      </div>
      </body>
    </html>
  )
}
