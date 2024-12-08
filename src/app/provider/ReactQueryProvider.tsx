'use client'
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import {ReactNode} from "react";
import {Toaster} from "react-hot-toast";

const queryClient = new QueryClient()

function ReactQueryProvider({children}: { children: ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<Toaster/>
		</QueryClientProvider>
	);
}

export default ReactQueryProvider;