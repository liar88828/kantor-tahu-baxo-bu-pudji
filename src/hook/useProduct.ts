import { useInfiniteQuery } from "@tanstack/react-query";
import { useFetch } from "@/hook/useFetch";
import { PaginatedResponse, ResponseAll } from "@/interface/server/param";
import { TProductCreate, TProductDB } from "@/interface/entity/product.model";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { productCreate, productDelete, productUpdate } from "@/network/product";

export const PRODUCT_KEY = 'product'
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
		getProductUser, onDelete, onUpsert


	}
}