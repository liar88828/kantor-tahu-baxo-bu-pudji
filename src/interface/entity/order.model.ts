import { Customers, Orders } from "@prisma/client";
import { ParamsApi } from "@/interface/server/Interfacesitory";

export type TOrderDB = Orders
export type TOrderCreate = Omit<Orders, 'id' | "created_at" | "updated_at">;
export type TOrderUpdate = Omit<Orders, "created_at" | "updated_at">;
export type MonthlyTotal = {
    month: string;
    total: number;
};

export type ResponseMonthData = { year: number, dataMonth: MonthlyTotal[] }

export const exampleSearch = {
    receiverName: "Alice",
    status: "Pending",
    dateRange: { start: new Date("2024-12-01"), end: new Date("2024-12-31") },
    productId: "prod-001",
}
export type SearchOrder = {
    receiverName?: string;
    status?: string;
    dateRange?: { start: Date; end: Date };
    productId?: string;
};

export type OrderParams = ParamsApi<{ name: string, status: string }>
export type ResponseCreateOrderTransaction = { order: Orders, orderCustomers: Customers, orderProduct: any };
