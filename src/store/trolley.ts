import { create } from 'zustand'

import { TTrolleyProductDB } from "@/interface/entity/trolley.model";
import { toTotal } from "@/utils/toCalculate";

type TrolleyTypeStore = {
	onSelected: TTrolleyProductDB[];
    onTotalProduct: number;
	setSelected: (state: TTrolleyProductDB) => void;
	onIncrement: (idTrolley: string) => void;
	onDecrement: (idTrolley: string) => void;
	onRemove: (idTrolley: string) => void;
	setData: (state: TTrolleyProductDB[]) => void;
    isTrolleyIncluded: (idTrolley: string) => boolean;
    setTotalProduct: () => void;
};

const useTrolleyStore = create<TrolleyTypeStore>((set, get) => ({

	onSelected: [],
    onTotalProduct: 0,
    setTotalProduct: () => {
        set({ onTotalProduct: toTotal.subTotal(get().onSelected) });
    },
    isTrolleyIncluded: (idTrolley: string) => {
        return get().onSelected.some((trolley) => trolley.id === idTrolley);
    },

    setSelected: (dataProduct: TTrolleyProductDB) => {
        set((state) => {
            const isIncluded = state.onSelected.some((trolley) => trolley.id === dataProduct.id);
            const datas = isIncluded
                ? state.onSelected.filter((trolley) => trolley.id !== dataProduct.id)
                : [ ...state.onSelected, dataProduct ]
            return { onSelected: datas }
        })
        get().setTotalProduct()
    },

    onIncrement: (idTrolley) => {
        set((state) => ({
            onSelected: state.onSelected.map((item) =>
                item.id === idTrolley
                    ? { ...item, qty_at_buy: item.qty_at_buy + 1 }
                    : item
            ),
        }))
        get().setTotalProduct()
    },
    onDecrement: (idTrolley) => {
        set((state) => ({
            onSelected: state.onSelected.map((item) =>
                item.id === idTrolley && item.qty_at_buy > 1
                    ? { ...item, qty_at_buy: item.qty_at_buy - 1 }
                    : item
            ),
        }))
        get().setTotalProduct()

    },
	onRemove: (idTrolley) =>
		set((state) => ({
			onSelected: state.onSelected.filter((item) => item.id !== idTrolley),
		})),
	setData: (data: TTrolleyProductDB[]) => set((state) => ({
		onSelected: data,
	})),
}));

// Hook for initializing data
export const initializeCheckoutData = (initialData: TTrolleyProductDB[]) => {
	const { onSelected, onIncrement, onDecrement, onRemove } = useTrolleyStore.getState();
	useTrolleyStore.setState({ onSelected: initialData });
};

export default useTrolleyStore;
