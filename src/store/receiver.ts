import { create } from "zustand";
import { TReceiverCreate } from "@/interface/entity/receiver.model";

type ReceiverStore = {
    receiver: TReceiverCreate & { id: string }
    setReceiver: (data: Partial<TReceiverCreate>) => void
    reset: () => void
}
const initialState = {
    receiver: {
        address: "",
        name: "",
        phone: "",
        id: '',
    },
}
export const useReceiverStore = create<ReceiverStore>((set) => ( {
    ...initialState,
    reset: () => set(initialState),
    setReceiver: (data) =>
        set((state) => ( {
            receiver: {
                ...state.receiver, // Preserve existing data
                ...data, // Merge in new updates
            },
        } )),
} ))

// export const initializeOrderData = (initialData: TOrderTransactionCreate) => {
// 	const { onData, setData, setReceiver, onReceiver } = useOrderStore.getState();
// 	useOrderStore.setState({ onData: initialData });
// };
//
// export default useOrderStore;
