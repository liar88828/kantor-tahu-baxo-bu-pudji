import { ResponseJson } from '@/server/service/GateWay';

import { NextRequest } from 'next/server'
import { TContext } from "@/interface/server/param";
import { orderController } from "@/server/controller/order.controller";

export async function GET(request: NextRequest, context: TContext) {
	
	return ResponseJson(
		async () => orderController.findByStatus(request, context),
		"GET",
	)
	
}

export async function PATCH(request: NextRequest, context: TContext) {
	
	return ResponseJson(
		async () => orderController.updateStatus(request, context),
		"PATCH",
		'order'
	)
}

export async function PUT(request: NextRequest, context: TContext) {
	
	return ResponseJson(
		async () => orderController.updateOne(request, context),
		"PUT",
		'order')
	
}

//
// export async function PUT(request: NextRequest,) {
// 	const { id, json, method } = await Input(request)
// 	console.log(`route api ${ method } orderan`)
//
//
// 	if (id.length > 10 || !isObjectEmpty(json)) {
// 		return ResponseJson("PUT", () => c.edit(json, id),)
// 	}
// 	return NextResponse.json(errorEmptyID(method))
//
// }

export async function DELETE(request: NextRequest,) {
	//
	// try {
	// 	const { method, id, json: array }: { method: TMethod, id: string, json: string[] } = await Input(request)
	// 	console.log(`route api ${ method } orderan`)
	//
	// 	if (typeof id === "string") {
	// 		if (id.length > 10 && id.includes("_")) {
	// 			console.log("is just string")
	// 			return ResponseJson("DELETE", () => c.destroy(id))
	// 		}
	// 	}
	//
	// 	if (typeof array === "object") {
	// 		if (Array.isArray(array)) {
	// 			console.log("is array")
	// 			if (array.length === 1) {
	// 				console.log("one")
	// 				console.log(array)
	// 				return ResponseJson("DELETE", () => c.destroyOne(array[0]))
	// 			}
	// 			if (array.length > 1) {
	// 				console.log("many")
	// 				console.log(array)
	// 				return ResponseJson("DELETE", () => c.deleteMany(array))
	// 			}
	// 		}
	// 	}
	//
	// 	return NextResponse.json(errorEmptyID(method))
	//
	// } catch (e) {
	// 	NextResponse.json({ error: e })
	// }
}
