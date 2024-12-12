import { create } from 'zustand'

import { TTrolleyProduct } from "@/entity/trolley.model";

type TrolleyTypeStore = {
	onSelected: TTrolleyProduct[];
	setSelected: (state: TTrolleyProduct) => void;
	onIncrement: (idTrolley: string) => void;
	onDecrement: (idTrolley: string) => void;
	onRemove: (idTrolley: string) => void;
	setData: (state: TTrolleyProduct[]) => void;
};

const useTrolleyStore = create<TrolleyTypeStore>((set) => ({
	onSelected: [],
	setSelected: (dataProduct: TTrolleyProduct) => set((state) => {
		const isIncluded = state.onSelected.some((trolley) => trolley.id === dataProduct.id);
		const datas = isIncluded
			? state.onSelected.filter((trolley) => trolley.id !== dataProduct.id)
			: [ ...state.onSelected, dataProduct ]
		return { onSelected: datas }
	}),

	onIncrement: (idTrolley) =>
		set((state) => ({
			onSelected: state.onSelected.map((item) =>
				item.id === idTrolley
					? { ...item, qty_at_buy: item.qty_at_buy + 1 }
					: item
			),
		})),
	onDecrement: (idTrolley) =>
		set((state) => ({
			onSelected: state.onSelected.map((item) =>
				item.id === idTrolley && item.qty_at_buy > 1
					? { ...item, qty_at_buy: item.qty_at_buy - 1 }
					: item
			),
		})),
	onRemove: (idTrolley) =>
		set((state) => ({
			onSelected: state.onSelected.filter((item) => item.id !== idTrolley),
		})),
	setData: (data: TTrolleyProduct[]) => set((state) => ({
		onSelected: data,
	})),
}));

// Hook for initializing data
export const initializeCheckoutData = (initialData: TTrolleyProduct[]) => {
	const { onSelected, onIncrement, onDecrement, onRemove } = useTrolleyStore.getState();
	useTrolleyStore.setState({ onSelected: initialData });
};

export default useTrolleyStore;
