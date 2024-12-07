import type { TMethod } from "../interface/Utils"

const isTest = true
export type FetchResponse<R> = Promise<{ msg: string; data: R; code: number }>;
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

  try {
    // Make the fetch request
    const response = await fetch(
      `http://localhost:3000/api/${url}`,
      fetchOptions
    )

    // Check for successful response
    if (isTest != true) {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
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