import { OrderId, TOrderTransactionDB } from "@/entity/transaction.model";
import { create } from "zustand/index";

type TableStore = {
	search: string
	status: string
	data: TOrderTransactionDB[];
	setData(data: TOrderTransactionDB[]): void;
	setTable(table: TOrderTransactionDB): void;
	existTable(id: OrderId): boolean;
	setSearch(text: string): void;
	setStatus(text: string): void;
}

export const useTableStore = create<TableStore>((set, get) => ({
	data: [],
	search: '',
	status: "",
	setStatus: (text) => set({ status: text }),
	setSearch: (text) => set({ search: text }),
	setData: (data: TOrderTransactionDB[]) => {
		set({ data });
	},
	existTable: (id: OrderId) => {
		return get().data.some((trolley) => trolley.id === id);
	},
	setTable: (table: TOrderTransactionDB) => {
		set((state) => {
			const isIncluded = state.data.some((trolley) => trolley.id === table.id);
			const datas = isIncluded
				? state.data.filter((trolley) => trolley.id !== table.id)
				: [ ...state.data, table ]
			return {
				data: datas
			}
		});
	}
}))