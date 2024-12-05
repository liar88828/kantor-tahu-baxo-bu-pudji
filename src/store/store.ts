import { configureStore } from '@reduxjs/toolkit'
import Trolley from "@/store/trolley";
export const store = configureStore({
	reducer: {
		trolley:Trolley
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch