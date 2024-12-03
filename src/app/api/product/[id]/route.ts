import { ResponseJson } from '@/server/service/GateWay';
import { NextRequest } from 'next/server'
import { TContext } from "@/interface/server/param";
import { productController } from "@/server/controller/product.controller";

export async function GET(request: NextRequest, context: TContext) {
	
	return await ResponseJson(
		async () => productController.findById(request, context),
		"GET",)
	
}

export async function DELETE(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => productController.deleteOne(request, context),
		"DELETE",)
}

export async function PUT(request: NextRequest, context: TContext) {
	
	return await ResponseJson(
		async () => productController.updateOne(request, context),
		"PUT",
	)
	
}

