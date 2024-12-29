import { useEffect, useRef } from "react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";

interface UseInfinityScrollProps {
	queryResult: UseInfiniteQueryResult<any, unknown>; // React Query's result type
}

const useInfinityScroll = ({ queryResult }: UseInfinityScrollProps) => {
	const { fetchNextPage, hasNextPage, isFetchingNextPage } = queryResult;
	const loadMoreRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
                    // noinspection JSIgnoredPromiseFromCall
                    fetchNextPage()
				}
			},
			{ threshold: 1.0 }
		);
		// Capture the current ref value
		const currentRef = loadMoreRef.current;

		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [fetchNextPage, hasNextPage]);

	return { loadMoreRef, isFetchingNextPage, hasNextPage };
};

export default useInfinityScroll;
