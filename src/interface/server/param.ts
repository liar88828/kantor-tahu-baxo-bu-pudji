import { TProductDB } from "@/entity/product.model";

export type TContext = { params: Promise<{ id: string }> }
export type TReactFormHookComponent<T> = {
	defaultValues: T,
	method: "POST" | "PUT",
	id: string,
	// onSubmitAction: (value: T) => void
};

export type FetchResponse<R> = Promise<{ msg: string; data: R; code: number }>
export type ResponseAll<T> = {
	data: T[],
	page: number, pageSize: number
}

export type PaginatedResponse = {
	data: TProductDB[];
	nextCursor: number; // Cursor for next page or null if no more data
};

export type PageParams = {
	pageParam?: string;
};
