import { TOrderProductList } from "@/entity/transaction.model";
import { useState } from "react";

export const useCheckout = (data: TOrderProductList[] | undefined) => {

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [ newData, setNewData ] = useState(data);

	const onIncrement = (idTrolley: string) => {
		setNewData((prev) =>
			prev?.map((item) =>
				item.id === idTrolley
					? { ...item, qty: item.qty + 1 }
					: item
			)
		);
	};

	const onDecrement = (idTrolley: string) => {
		setNewData((prev) =>
			prev?.map((item) =>
				item.id === idTrolley && item.qty > 1
					? { ...item, qty: item.qty - 1 }
					: item
			)
		);
	};

	const onRemove = (idTrolley: string) => {
		setNewData((prev) =>
			prev?.filter((item) => item.id !== idTrolley)
		);
	};

	return {
		onIncrement,
		onDecrement,
		onRemove,
		onData: newData,
	};
};