export function toUrl<T extends object>(endPoint: string, params: T): string {
	const url = new URL(`https://xx.com/api/${ endPoint }`);
	const searchParams = new URLSearchParams();

	// Loop through the keys of the params object
	Object.keys(params).forEach((key) => {
		const value = params[key as keyof typeof params];//why error
		// Otherwise, append the key-value pair
		searchParams.append(key, value);
	});

	// Set the query parameters to the URL
	url.search = searchParams.toString();

	return url.toString().split('/').pop() || ''; // Return the full URL with query parameters
}