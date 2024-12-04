import { Deliverys } from "@prisma/client";

export type TDeliveryDB = Deliverys
export type TDeliveryCreate = Omit<Deliverys, 'id' | "created_at" | "updated_at">;
// export type TDeliveryUpdate = Omit<Deliverys, "created_at" | "updated_at">;
export type TDeliverySearch = {
	address?: string,
	type?: string,
	name?: string
};
