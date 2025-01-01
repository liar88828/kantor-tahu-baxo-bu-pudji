import toast from "react-hot-toast";
import { PAYMENT, TPaymentCreate } from "@/interface/entity/payment.model";
import { paymentAll, paymentCreate, paymentDelete, paymentUpdate } from "@/network/payment";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function usePayment() {
    function OnGet(searchDebounce: string, search: string) {
        const { data: payments, isError, isFetching } = useQuery(
            {
                select: (payments) => {
                    return payments.data.data
                },
                queryFn: () => paymentAll({
                    filter: { name: searchDebounce },
                    pagination: {}
                }),
                enabled: searchDebounce === search,
                queryKey: [ PAYMENT.KEY, searchDebounce ],
                staleTime: 1000 * 60,

                // gcTime: 1000 * 60,
                // networkMode:'offlineFirst'
            }
        )
        return { payments, isError, isFetching };
    }

    const router = useRouter()
    const onDelete = async (id: string) => {
        const idToast = toast.loading('Delete Data API')
        try {
            await paymentDelete(id)
            toast.success('Success Delete Data');
            router.refresh()
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message)
                toast.error(e.message);
            }
            toast.error('something error');
        } finally {
            toast.dismiss(idToast)
        }
    }

    const onUpsert = async ({ method, data, id }: {
        method: string, data: TPaymentCreate, id?: string
    }) => {

        const idToast = toast.loading("Send Data to API");
        try {
            if (method === 'POST') {
                await paymentCreate(data)
                toast.success('Success Create Data');
            } else if (method === 'PUT' && id) {
                await paymentUpdate(data, id)
                toast.success('Success Update Data');
            }
            router.push('/admin/payment')
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e)
                toast(e.message);
            }
            toast.error('something error');
        } finally {
            toast.dismiss(idToast);
        }
    }

    return {
        onDelete, onUpsert, onGet: OnGet
    }
}
