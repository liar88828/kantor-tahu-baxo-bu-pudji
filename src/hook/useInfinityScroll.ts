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
					fetchNextPage();
				}
			},
			{ threshold: 1.0 }
		);

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current);
		}

		return () => {
			if (loadMoreRef.current) {
				observer.unobserve(loadMoreRef.current);
			}
		};
	}, [fetchNextPage, hasNextPage]);

	return { loadMoreRef, isFetchingNextPage, hasNextPage };
};

export default useInfinityScroll;
