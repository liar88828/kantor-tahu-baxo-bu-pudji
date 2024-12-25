'use client'
import { useInfiniteQuery } from "@tanstack/react-query";
import { toFetch } from "@/hook/toFetch";
import { PaginatedResponse, ResponseAll } from "@/interface/server/param";
import { TProductCreate, TProductDB } from "@/interface/entity/product.model";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { productCreate, productDelete, productUpdate } from "@/network/product";
import React, { useEffect } from "react";

export enum PRODUCT {KEY = 'product' }
export const useProduct = () => {
	const router = useRouter()

	const onUpsert = async ({ data, method, id }: {
		data: TProductCreate, method: string, id?: string
	}) => {
		const idToast = toast.loading("Send Data to API");
		try {
			if (method === 'POST') {
				await productCreate(data)
				toast.success('Success Create Data');
			} else if (method === 'PUT' && id) {
				await productUpdate(data, id)
				toast.success('Success Update Data');
			}
			router.push('/admin/product')
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.error(e)
				toast(e.message);
			}
			toast.error('something error');
		} finally {
			toast.dismiss(idToast);
		}

	}

	const onDelete = async (id: string) => {
		const idToast = toast.loading('Delete Data API')
		try {
			await productDelete(id)
			toast.success('Success Delete Data');
			router.refresh()
		} catch (e) {
			if (e instanceof Error) {
				console.error(e.message)
				toast.error(e.message);
			}
			toast.error('something error');

		} finally {
			toast.dismiss(idToast)
		}
	}

	function getProductUser(search: string,debouncedSearch:string) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		return useInfiniteQuery<PaginatedResponse, Error>({
			initialPageParam: 1,
			enabled: !!debouncedSearch || search === '',
            queryKey: [ PRODUCT.KEY, debouncedSearch ],

			queryFn: async (context): Promise<PaginatedResponse> => {
				const url = `/product?page=${ context.pageParam }&name=${ debouncedSearch }`
				console.log(url)
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const { data } = await toFetch<ResponseAll<TProductDB>>('GET', url);

				return {
					data: data.data,
					nextCursor: data.page
				}
			},

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

		});

	}

	const useProductInfiniteQuery = (debouncedSearch: string, search: string, observerRef: React.RefObject<HTMLDivElement | null>) => {
		const {
			data,
			status,
			error,
			fetchNextPage,
			hasNextPage,
			isFetching,
			isFetchingNextPage,
		} = useInfiniteQuery<PaginatedResponse, Error>({
			initialPageParam: 1,
			enabled: !!debouncedSearch || search === '',
            queryKey: [ PRODUCT.KEY, debouncedSearch ],

			queryFn: async ({ pageParam }): Promise<PaginatedResponse> => {
				const url = `/product?page=${ pageParam }&name=${ debouncedSearch }`;
				console.log(url);
				const { data } = await toFetch<ResponseAll<TProductDB>>('GET', url);

				return {
					data: data.data,
					nextCursor: data.page,
				};
			},

			getNextPageParam: (lastPage) => {
				if (lastPage.data.length === 0 || lastPage.nextCursor === 0) return undefined;
				// console.log(lastPage.nextCursor)
				return lastPage.nextCursor + 1;
			},

			getPreviousPageParam: (firstPage) => {
				if (firstPage.nextCursor <= 1) return undefined;
				return firstPage.nextCursor;
			},

		});

		useEffect(() => {
			if (!hasNextPage) return;

			const observer = new IntersectionObserver(
				([ entry ]) => {
                    if (entry.isIntersecting) { // noinspection JSIgnoredPromiseFromCall
                        fetchNextPage()
                    }
				},
				{ rootMargin: '200px' }
			);

			const observerRefCurrent = observerRef.current

			if (observerRefCurrent) observer.observe(observerRefCurrent);

			return () => {
				if (observerRefCurrent) observer.unobserve(observerRefCurrent);
			};
		}, [ hasNextPage, fetchNextPage, observerRef ]);

		return { data, status, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage };
	};



	return {

		getProductUser, onDelete, onUpsert, useProductInfiniteQuery


	}
}