import { orderAll } from "@/network/order";
import OrderTable from "@/app/admin/order/OrderTable.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ORDER_KEY } from "@/hook/useOrder";

export const dynamic = 'force-dynamic';


async function Page() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [ ORDER_KEY.order ],
		queryFn: ()=>orderAll(),
	});

	return (
		<HydrationBoundary state={ dehydrate(queryClient) }>
			<OrderTable/>
		</HydrationBoundary>
	);
}

export default Page;