import { orderGet } from "@/network/order";
import OrderTable from "@/app/admin/order/OrderTable.client";

export const dynamic = 'force-dynamic';


async function Page() {
	const data = await orderGet()
	return (
		<div className={ 'mt-5 px-2' }>
			<OrderTable data={ data.data }/>
		</div>);
}

export default Page;