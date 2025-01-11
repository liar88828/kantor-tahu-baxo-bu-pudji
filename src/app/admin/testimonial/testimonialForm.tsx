'use client'
import { Testimonials } from '@prisma/client';
import { useActionState } from "react";
import { ErrorForm } from "@/app/components/errorForm";
import { testimonialUpsertAction } from "@/server/action/testimonial";

export function TestimonialForm(
    {
        defaultValue,
        method
    }: {
        defaultValue: Testimonials | undefined
        method: "POST" | "PUT"
    }) {
    const [ state, action, isPending ] = useActionState(testimonialUpsertAction, undefined)

    return (
        <form action={ action } className="space-y-4">
            <input type="hidden" value={ defaultValue?.id } name={ 'id' }/>
            <input type="hidden" value={ method } name={ 'method' }/>
            <h1 className="text-2xl font-bold">Create Profile</h1>
            <input
                defaultValue={ defaultValue?.name }
                value={ state?.prev.name && '' }
                type="text"
                name="name"
                placeholder="Name"
                className="input input-bordered w-full"
                required/>
            <ErrorForm errors={ state?.errors?.name } title="must add:"/>

            <input
                defaultValue={ defaultValue?.social }
                value={ state?.prev.social && '' }
                type="text"
                name="social"
                placeholder="Social Link"
                className="input input-bordered w-full" required/>
            <ErrorForm errors={ state?.errors?.social } title="must add:"/>

            <input
                defaultValue={ defaultValue?.jobs }
                value={ state?.prev.jobs && '' }
                type="text"
                name="jobs"
                placeholder="Jobs"
                className="input input-bordered w-full" required/>
            <ErrorForm errors={ state?.errors?.jobs } title="must add:"/>

            <textarea
                defaultValue={ defaultValue?.desc }
                value={ state?.prev.desc && '' }
                name="desc"
                placeholder="Description"
                className="textarea textarea-bordered w-full">
            </textarea>
            <ErrorForm errors={ state?.errors?.desc } title="must add:"/>

            <button
                type="submit"
                disabled={ isPending }
                className="btn btn-primary">
                { method === 'POST' ? 'Create' : 'Update' }
            </button>
        </form>
    );
}
