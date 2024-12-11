import { create } from 'zustand'
import { TOrderProductList } from "@/entity/transaction.model";

type TrolleyTypeStore = {
	onSelected: TOrderProductList[];
	setSelected: (state: TOrderProductList) => void;
	onIncrement: (idTrolley: string) => void;
	onDecrement: (idTrolley: string) => void;
	onRemove: (idTrolley: string) => void;
	setData: (state: TOrderProductList[]) => void;
};

const useTrolleyStore = create<TrolleyTypeStore>((set) => ({
	onSelected: [],
	setSelected: (dataProduct: TOrderProductList) => set((state) => {
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
					? { ...item, qty: item.qty + 1 }
					: item
			),
		})),
	onDecrement: (idTrolley) =>
		set((state) => ({
			onSelected: state.onSelected.map((item) =>
				item.id === idTrolley && item.qty > 1
					? { ...item, qty: item.qty - 1 }
					: item
			),
		})),
	onRemove: (idTrolley) =>
		set((state) => ({
			onSelected: state.onSelected.filter((item) => item.id !== idTrolley),
		})),
	setData: (data: TOrderProductList[]) => set((state) => ({
		onSelected: data,
	})),
}));

// Hook for initializing data
export const initializeCheckoutData = (initialData: TOrderProductList[]) => {
	const { onSelected, onIncrement, onDecrement, onRemove } = useTrolleyStore.getState();
	useTrolleyStore.setState({ onSelected: initialData });
};

export default useTrolleyStore;
