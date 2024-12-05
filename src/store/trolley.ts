import {create} from 'zustand'

interface TrolleyStore {
	trolleys: number,
	increment: (id: string) => void,
	decrement: (id: string) => void,

}

export const useTrolley = create<TrolleyStore>((set) => ({
	trolleys: 0,

	increment: (id: string) => set((state) => ({
		trolleys: state.trolleys + 1
	})),

	decrement: (id: string) => set((state) => (
		{trolleys: state.trolleys - 1}
	))
}))