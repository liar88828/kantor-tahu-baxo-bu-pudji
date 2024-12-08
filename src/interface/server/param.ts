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
