import { TMethod } from "@/interface/Utils"
import { FetchResponse } from "@/interface/server/param";

const isTest = false

export const useFetch = async <R>(
	method: TMethod,
	url: string,
	data?: any
): FetchResponse<R> => {
	// Initialize headers
	const headers: HeadersInit = {
		"Content-Type": "application/json",
	}

	// Prepare fetch options
	const fetchOptions: RequestInit = {
		method: method,
		headers,

	}

	// If method is POST, PUT, or PATCH, include the body
	if (["POST", "PUT", "PATCH"].includes(method) && data) {
		fetchOptions.body = JSON.stringify(data)
	}

	if ([ "GET" ].includes(method)) {
		fetchOptions.cache = 'no-store'
		// cache: 'no-store',
		// fetchOptions.next = {
		// 	revalidate: 0
		// }

	}


	try {
		// Make the fetch request
		const response = await fetch(
			`http://localhost:3000/api/${url}`,
			fetchOptions
		)

		// Check for successful response
		// @ts-ignore
		if (!isTest) {
			if (!response.ok) {
				const data = await response.json()
				// console.error()
				throw new Error(`HTTP error! status: ${response.status} msg : ${data.msg}`)
			}
		}

		// Parse and return the JSON response
		return await response.json()
	} catch (error) {
		// Handle errors
		console.error("Fetch error:", error)
		throw error // Rethrow the error for the caller to handle
	}
}
