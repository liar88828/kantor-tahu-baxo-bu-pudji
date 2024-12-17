export type StatusOrder = "Fail" | "Completed" | "Pending"

export const toStatus = (status: string) => {
	return status === 'Pending' ? 'info' :
		status === 'Fail' ? 'error' : 'success'
}