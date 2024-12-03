import { TContext } from "@/interface/server/param";
import { NextRequest } from "next/server";

export async function getId(
	{ params }: TContext) {
	const param = await params
	if (param) {
		return param.id
	}
	throw new Error('please add id')
}

export async function getJson(request: NextRequest) {
	return request.json()
}

export function getParams(request: NextRequest, text: string) {
	const url = new URL(request.url);
	const searchParams = new URLSearchParams(url.search);
	const value = searchParams.get(text);
	if (!value) {
		throw new Error(`please add a params : ${ text }`)
	}
	return value
}