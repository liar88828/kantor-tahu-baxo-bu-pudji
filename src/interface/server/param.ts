import { TProductDB } from "@/interface/entity/product.model";

export type TContext = {
	searchParams: Promise<{ search: string,status:string }>,
	params: Promise<{ id: string, search: string, }>
}

export type TReactFormHookComponent<T> = {
	defaultValues: T,
	method: "POST" | "PUT",
	id: string,
	// onSubmitAction: (value: T) => void
};

export type FetchResponse<R> = Promise<{ msg: string; data: R; code: number }>
export type ResponseAll<T> = {
	data: T[],
	page: number,
	limit: number
}

export type PaginatedResponse = {
	data: TProductDB[];
	nextCursor: number; // Cursor for next page or null if no more data
};

export type PageParams = {
	pageParam?: string;
};

