import {NextRequest} from "next/server"
import {TContext} from "@/interface/server/param"
import {ResponseJson} from "@/lib/requestHelper"
import {trolleyController} from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => trolleyController.findById(request, context),
		"GET",
		"trolley"
	)
}

export async function PUT(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => trolleyController.updateOne(request, context),
		"POST",
		"trolley"
	)
}


export async function DELETE(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => trolleyController.deleteOne(request, context),
		"DELETE",
		"trolley"
	)
}
