import { TContext } from "@/interface/server/param"
//ResponseJson
import { NextRequest, NextResponse } from "next/server"
import Zod from "zod"
import { Prisma } from ".prisma/client"
import type { TMethod, ToModel } from "../interface/Utils"

export async function getId({params}: TContext) {
	const param = await params
	if (param) {
		return param.id
	}
	throw new Error("please add id")
}

export async function getContext({ params }: TContext, text: keyof Awaited<TContext['params']>) {

	const param = await params
	if (param && text in param) {
		return param[text]
	}
	return ''
}

export async function getSearchName({ searchParams }: TContext, text: keyof Awaited<TContext['searchParams']>) {

	const searchParam = await searchParams
	if (searchParam && text in searchParam) {
		return searchParam[text]
	}
	return ''
}


export async function getJson(request: NextRequest) {
	return request.json()
}

export function getParams(request: NextRequest, text: string) {
	const url = new URL(request.url)
	const searchParams = new URLSearchParams(url.search)
	return searchParams.get(text) ?? undefined
}

export function getParamsThrow(request: NextRequest, text: string) {
	const url = new URL(request.url)
	const searchParams = new URLSearchParams(url.search)
	const value = searchParams.get(text)
	if (!value) {
		throw new Error(`please add a params : ${text}`)
	}
	return value
}

export async function ResponseJson(
	fun: any,
	method: TMethod,
	_from: ToModel = "not implement",
	code: number = 200
) {
	console.info(`method : ${method} from : ${_from}`)

	try {
		const controls: any = await fun()
		const response = {
			msg: `${method} ${_from} success`,
			data: controls,
			code: code,
		}
		return NextResponse.json(response, {status: code})
	} catch (err: unknown) {
		if (err instanceof Zod.ZodError) {
			return NextResponse.json(
				{
					msg: `Error on ${method}`,
					error: err.issues,
					code: 400,
				},
				{status: 400}
			)
		}

		if (err instanceof Prisma.PrismaClientValidationError) {
			return NextResponse.json(
				{
					msg: `Error on ${method}`,
					error: err,
					code: 400,
				},
				{status: 400}
			)
		}
		if (err instanceof Prisma.PrismaClientUnknownRequestError) {
			return NextResponse.json(
				{
					msg: `Error on ${method}`,
					error: err,
					code: 400,
				},
				{status: 400}
			)
		}
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === 'P2003') {
				return NextResponse.json(
					{
						msg: `Error on ${method} : 'The is has relational with other Data, we recommendation to edit than delete the data'`,
						error: err,
						code: 400,
					},
					{status: 400}
				)
			}
		}
		if (err instanceof ErrorResponse) {

		return NextResponse.json(
			{
				msg: `Error on ${method}`,
				error: err.msg,
				code: err.code,
			},
			{status: 500}
		)
		}

		if (err instanceof Error) {

			return NextResponse.json(
				{
					msg: `Error on ${ method }`,
					error: err.message,
					code: 500,
				},
				{ status: 500 }
			)
		}
	}
}

export class ErrorResponse extends Error {

	constructor(public msg: string, public code: number) {
		super(msg);
		Object.setPrototypeOf(this, ErrorResponse.prototype);
	}

}