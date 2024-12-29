'use client'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
	defaultOptions: {

		queries: {
			// gcTime: 1000 * 60 * 60 * 24, // 24 hours
			// retry: 3,
			// retryDelay: 1000,
			// staleTime: 60000,

		},
	},
})

function ReactQueryProvider({children}: { children: ReactNode }) {
	return (
		<QueryClientProvider client={ queryClient }
		>
			{children}
			<Toaster/>
			<ReactQueryDevtools initialIsOpen={ false }/>
		</QueryClientProvider>
	);
}

export default ReactQueryProvider;