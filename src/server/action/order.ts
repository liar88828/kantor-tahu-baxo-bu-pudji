'use server'
import { revalidatePath } from "next/cache";
import { prisma } from "@/config/prisma";
import { z } from "zod";

export async function changeStatusAction(prevState: any, form: FormData): Promise<{
    msg: any,
    isSuccess: boolean,
}> {
    try {
        const status = form.get('status') ?? ''
        const id = form.get('id') ?? ''
        console.log(status);
        if (!id || !status) {
            throw new Error(`Invalid status: ${ status }`);
        }
        const validData = z.object({
            id: z.string().uuid(),
            status: z.string(),
        }).parse({ id, status });

        const data = await prisma.orders.update({
            where: {
                id: validData.id
            },
            data: { status: validData.status }
        })
        // console.log(data)
        revalidatePath('/')
        return {
            msg: `Success Change Order by Invoice : ${ validData.id } to ${ validData.status }`,
            isSuccess: true
        }
    } catch (err) {
        if (err instanceof Error) {
            return {
                isSuccess: false,
                msg: err.message
            }
        }
        return {
            msg: 'Error Server',
            isSuccess: false
        }
    }
}
