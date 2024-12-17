import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 1000): T {
	const [ debouncedValue, setDebouncedValue ] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);

		return () => clearTimeout(handler); // Cleanup on value change or unmount
	}, [ value, delay ]);

	return debouncedValue;
}