import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deliveryAll, deliveryCreate, deliveryDelete, deliveryUpdate } from "@/network/delivery";
import { useQuery } from "@tanstack/react-query";
import { DELIVERY, TDeliveryCreate } from "@/interface/entity/delivery.model";
import { DeliveryParams } from "@/server/repository/delivery.repo";

export const useDelivery = () => {
    const router = useRouter()
    const onDelete = async (id: string) => {
        const idToast = toast.loading('Delete Data API')
        try {
            await deliveryDelete(id)
            toast.success('Success Delete Data');
            router.refresh()
        } catch (e) {
            if (e instanceof Error) {
                // console.error(e.message)
                toast.error(e.message);
            }
            toast.error('something error');

        } finally {
            toast.dismiss(idToast)
        }
    }

    const GetAll = (option: DeliveryParams, enabled: boolean) => useQuery({
        enabled,
        queryKey: [ DELIVERY.KEY, option?.filter?.name ?? '' ],
        queryFn: () => deliveryAll(option),
        select: (deliverys) => {
            return deliverys.data.data
        }
    })

    const onUpsert = async ({ data, method, id }: {
        data: TDeliveryCreate, method: string, id?: string
    }) => {
        // console.log(data)
        const idToast = toast.loading("Send Data to API");
        try {
            if (method === 'POST') {
                await deliveryCreate(data)
                toast.success('Success Create Data');
            } else if (method === 'PUT' && id) {
                // console.log(data)
                await deliveryUpdate(data, id)
                toast.success('Success Create Data');
            }
            router.push('/admin/delivery')
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.error(e.message)
                toast(e.message);
            }
            toast.error('something error');
        } finally {
            toast.dismiss(idToast);
        }
    }

    return {
        onDelete, getAll: GetAll, onUpsert
    }
}
