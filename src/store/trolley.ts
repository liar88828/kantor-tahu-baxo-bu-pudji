import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {OrderProduct} from "@prisma/client";

export type TrolleyState = { trolleys: OrderProduct[] }
const initialState: TrolleyState = {trolleys: []}
export const counterSlice = createSlice({
	name: 'trolley',
	initialState,
	reducers: {

		initState: (state, action: PayloadAction<OrderProduct[]>) => {
			state.trolleys = action.payload
		},

		incrementById: (state, action: PayloadAction<OrderProduct['id']>) => {
			const product = state.trolleys.find((item) => item.id === action.payload);
			if (product) {
				product.qty += 1; // Assuming `OrderProduct` has a `quantity` field.
			}
		},

		decrementById: (state, action: PayloadAction<OrderProduct['id']>) => {
			const product = state.trolleys.find((item) => item.id === action.payload);
			if (product && product.qty > 1) {
				product.qty -= 1;
			} else if (product) {
				// If quantity is 1 or less, remove the product from the trolley
				state.trolleys = state.trolleys.filter((item) => item.id !== action.payload);
			}
		},

		pushTrolley: (state, action: PayloadAction<Omit<OrderProduct,'id'|'id_order'|'qty'>>) => {
			state.trolleys.push(action.payload);
		}


	}
})

export const {initState, incrementById, decrementById, pushTrolley} = counterSlice.actions;
export default counterSlice.reducer;