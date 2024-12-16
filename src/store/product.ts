import { create } from "zustand";
import toast from "react-hot-toast";
import { TProductDB } from "@/interface/entity/product.model";
import { productAll, productDelete } from "@/network/product";
import { TTrolleyProductUser } from "@/interface/entity/trolley.model";

interface ProductStore {
	total: number;
	idProduct: string []
	search: string
	isLoading: boolean;
	productAsync: TProductDB[]
	productStore: TTrolleyProductUser[]
	product: TProductDB | null
	getProductData: () => Promise<void>
	setProduct: (data: TProductDB) => void
	setSearch: (search: string) => void
	onIncrement: (id: string) => void;
	onDecrement: (id: string) => void;
	onRemove: (id: string) => void;
	setQty: (id: string, qty: number) => void
	setTotal: () => void

}

export const useProductStore = create<ProductStore>((set, get) => ({
	total: 0,
	idProduct: [],
	isLoading: false,
	productAsync: [],
	productStore: [],
	product: null,
	search: '',

	setTotal: () => {
		set((state) => ({
			total: state.productStore.reduce((total, item) => {
				total += item.qty_at_buy * item.price_at_buy;
				return total;
			}, 0)
		}))
	},

	setQty: (id, qty) => {
		if (qty > 0) {
			set((state) => {
				return {
					productStore: state.productStore.map((item) =>
						item.id_product === id
							? { ...item, qty_at_buy: qty }
							: item
					)
				}
			})
		}
		get().setTotal()

	},

	onRemove: (id) => {
		set((state) => ({
			productStore: state.productStore.filter((item) => item.Product.id !== id),
			idProduct: state.idProduct.filter((item) => item !== id),
		}))
		get().setTotal()
	},

	onIncrement: (id: string) => {
		set((state) => ({
			productStore: state.productStore.map((item) =>
				item.id_product === id
					? { ...item, qty_at_buy: item.qty_at_buy + 1 }
					: item
			)
		}))
		get().setTotal()
	},

	onDecrement: (id: string) => {
		set((state) => ({
			productStore: state.productStore.map((item) =>
				item.id_product === id && item.qty_at_buy > 1
					? { ...item, qty_at_buy: item.qty_at_buy - 1 }
					: item
			),
		}))
		get().setTotal()
	},

	setProduct: (data) => {
		set((store) => {
			const newData: TTrolleyProductUser = {
				id_user: "",
				id_product: data.id,
				Product: data,
				qty_at_buy: 1,
				price_at_buy: data.price
			}
			const datas = [ ...store.productStore, newData ]
			return {
				productStore: datas,
				idProduct: datas.map(data => data.id_product)
			}
		})
		get().setTotal()
	},

	getProductData: async () => {
		try {
			set({ isLoading: true });
			if (get().productAsync.length === 0) {
				console.info("is fetching");
				const { data } = await productAll()
				if (data.data.length > 0) {
					set({ productAsync: data.data })
				}
			}
		} catch (e) {
			if (e instanceof Error) {
				toast.error(e.message)
			}
		} finally {
			console.info("is loaded");
			set({ isLoading: false });
		}
	},

	setSearch: (search) => set(({ search }))
}))