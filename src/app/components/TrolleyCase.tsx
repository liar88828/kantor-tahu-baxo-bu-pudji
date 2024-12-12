import { toRupiah } from "@/utils/toRupiah";
import { TTrolleyProduct } from "@/entity/trolley.model";

interface TrolleyCaseProps {
	trolleys?: TTrolleyProduct[],
	fun?: () => void,
	text?: string,
}

export function TrolleyCase({ trolleys, fun, text = "View cart" }: TrolleyCaseProps) {
	const subTotal = (): number => {
		if (!trolleys) return 0;
		return trolleys.reduce((total, trolley) => {
			total += trolley.price_at_buy * trolley.qty_at_buy
			return total;
		}, 0)
	}
	return (
		<div className="card-body">
			<span className="text-lg font-bold">{ trolleys ? trolleys.length : 0 } Items</span>
			<span className="text-info">Subtotal: { toRupiah(subTotal()) }</span>
			<div className="card-actions">
				<button
					onClick={ fun }
					className="btn btn-primary btn-block">
					{ text }
				</button>
			</div>
		</div>
	);
}