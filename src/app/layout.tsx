import { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react';
import ReactQueryProvider from "@/app/components/Layout/ReactQueryProvider";
import 'react-toastify/dist/ReactToastify.css';
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
})

export const metadata: Metadata = {
    title: 'Index',
	description: 'Generated by create next app',
}

export default function RootLayout({children}: {
	children: ReactNode
}) {
	return (
		<html lang="en" className={ inter.className }
			  // data-theme={ 'light' }
		>
		<body className={"min-h-screen "}>
		<ReactQueryProvider>
			{children}
		</ReactQueryProvider>
		</body>
		</html>
	)
}
