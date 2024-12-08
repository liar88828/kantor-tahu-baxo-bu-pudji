import { useInfiniteQuery } from "@tanstack/react-query";
import { useFetch } from "@/hook/useFetch";
import { PaginatedResponse, ResponseAll } from "@/interface/server/param";
import { TProductDB } from "@/entity/product.model";

export const PRODUCT_KEY = 'product'
export const useProduct = () => {
	function getProductUser(search: string,debouncedSearch:string) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return useInfiniteQuery<PaginatedResponse, Error>({
			queryKey: [PRODUCT_KEY,debouncedSearch],
			queryFn: async (context): Promise<PaginatedResponse> => {
				const url = `/product?page=${ context.pageParam }&name=${ debouncedSearch }`
				console.log(url)
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const { data } = await useFetch<ResponseAll<TProductDB>>('GET', url);

				return {
					data: data.data,
					nextCursor: data.page
				}
			},
			initialPageParam: 1,
			getNextPageParam: (lastPage, pages) => {
				if (lastPage.data.length !== 0) {
					if (lastPage.nextCursor === 0) {
						return undefined;
					} else {
						return lastPage.nextCursor + 1
					}
				}
			},
			getPreviousPageParam: (firstPage, pages) => {
				// console.log(firstPage, 'firstPage', pages)

				if (firstPage.nextCursor <= 1) {
					return undefined
				}
				return firstPage.nextCursor //- 1
			},
			enabled: !!debouncedSearch || search === '',
		});
	}

	return {
		getProductUser: getProductUser
	}
}