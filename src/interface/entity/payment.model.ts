import { Payments } from "@prisma/client";

export type TPaymentDB = Payments
export type TPaymentCreate = Omit<Payments, 'id' | "created_at" | 'updated_at'>;
// export type TPaymentUpdate = Omit<Payments, "created_at" | 'updated_at'>;
export type TPaymentSearch = {
	address?: string,
	type?: string,
	name?: string
};
