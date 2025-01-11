import { prisma } from "@/config/prisma";
import { InterfaceRepository, ParamsApi } from "@/interface/server/InterfaceRepository";
import { TestimonialInput, testimonialSchema } from "@/server/controller/testimonial.controller";
import { z } from "zod";

// getAll data from database
export default class TestimonialRepository implements InterfaceRepository<TestimonialInput> {
    findAll(params: ParamsApi<object>): Promise<any> {
        const takeValid = z.number().parse(params.pagination.limit)
        return prisma.testimonials.findMany({ take: takeValid });
    }

    findById(id: number) {
        id = z.number().parse(id)
        return prisma.testimonials.findUnique({ where: { id } });
    }

    createOne(data: { name: string; desc: string; social: string; jobs: string; }): Promise<any> {
        data = testimonialSchema.parse(data)
        return prisma.testimonials.create({ data });
    }

    updateOne(data: { name: string; desc: string; social: string; jobs: string; }, id: number): Promise<any> {

        id = z.number().parse(id)
        data = testimonialSchema.parse(data)
        return prisma.testimonials.update({
            where: { id },
            data
        });
    }

    deleteOne(id: number): Promise<any> {
        id = z.number().parse(id)
        return prisma.testimonials.delete({ where: { id } });
    }

}