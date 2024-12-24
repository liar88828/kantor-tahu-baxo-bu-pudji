import { TTrolleyProductDB } from "@/interface/entity/trolley.model";

const subTotal = (trolleys?: TTrolleyProductDB[]): number => {
    if (!trolleys) return 0;
    if (trolleys.length === 0) return 0;
    return trolleys.reduce((total, trolley) => {
        total += trolley.price_at_buy * trolley.qty_at_buy
        return total;
    }, 0)
}

export const toTotal = {
    subTotal
}
