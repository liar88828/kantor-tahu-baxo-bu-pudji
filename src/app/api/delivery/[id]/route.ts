import { ResponseJson } from '@/server/service/GateWay';

import { NextRequest } from 'next/server'
import { TContext } from "@/interface/server/param";
import { deliveryController } from "@/server/controller/delivery.controller";

export async function GET(request: NextRequest, context: TContext) {
	
	return ResponseJson(
		async () => deliveryController.findById(request, context),
		"GET",
		'delivery'
	)
	
}

export async function DELETE(request: NextRequest, context: TContext) {
	
	return ResponseJson(
		async () => deliveryController.deleteOne(request, context),
		"DELETE",
		'delivery'
	)
}

export async function PUT(request: NextRequest, context: TContext) {
	
	return await ResponseJson(
		async () => deliveryController.updateOne(request, context),
		"PUT",
		'delivery'
	)
}
