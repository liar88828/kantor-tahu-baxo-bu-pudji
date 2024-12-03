import { NextRequest } from "next/server";
import { ResponseJson } from "@/server/service/GateWay";
import { tableController } from "@/server/controller/table.controller";
import { TContext } from "@/interface/server/param";

export async function GET(request: NextRequest, context: TContext) {
	return ResponseJson(
		async () => tableController.findByStatus(request, context),
		"GET",
	)
	
}

export async function PATCH(request: NextRequest, context: TContext) {
	
	return ResponseJson(
		async () => tableController.updateStatus(request, context),
		"PATCH",
	)
}

export async function PUT(request: NextRequest, context: TContext) {
	
	return ResponseJson(
		async () => tableController.edit(request, context),
		"PUT",
	)
	
}

