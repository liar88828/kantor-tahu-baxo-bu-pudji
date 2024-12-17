import { create } from 'zustand'

interface EmployeeStore {
	filter: {
		name: string,
		status: string,
	},
	setFilter: (filter: Partial<EmployeeStore['filter']>) => void,
}

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
	filter: {
		name: '',
		status: ''
	},
	setFilter: (filter) => {
		set((state) => ({
			filter: {
				...state.filter,
				...filter
			}
		}))
	},
}))