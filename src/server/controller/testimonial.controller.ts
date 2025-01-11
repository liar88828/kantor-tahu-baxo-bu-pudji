import { InterfaceController } from "@/interface/server/InterfaceController"
import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { getId, getIdNum, getParamsNum } from "@/utils/requestHelper"
import { z } from "zod";
import TestimonialRepository from "@/server/repository/testimonial.repo";

export const testimonialSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    desc: z.string().min(1, { message: "Description is required" }),
    social: z.string(),
    jobs: z.string().min(1, { message: "Jobs field is required" }),
});
export type TestimonialInput = z.infer<typeof testimonialSchema>;

export default class TestimonialController
    implements InterfaceController {
    constructor(private ceremonyRepository: TestimonialRepository) {
    }

    async findAll(request: NextRequest, __: TContext): Promise<any> {
        const takeRaw = getParamsNum(request, "limit")
        return this.ceremonyRepository.findAll({
            pagination: {},
            filter: { limit: takeRaw }
        })
    }

    async findById(_: NextRequest, context: TContext) {
        let id = await getIdNum(context)
        return this.ceremonyRepository.findById(id)
    }

    async createOne(request: NextRequest, __: TContext) {
        let data = await request.json()
        return this.ceremonyRepository.createOne(data)
    }

    async updateOne(request: NextRequest, context: TContext) {
        let data = await request.json()
        let id = Number(await getId(context))
        return this.ceremonyRepository.updateOne(data, id)
    }

    async deleteOne(_: NextRequest, context: TContext) {
        let id = Number(await getId(context))
        return this.ceremonyRepository.deleteOne(id)
    }
}
