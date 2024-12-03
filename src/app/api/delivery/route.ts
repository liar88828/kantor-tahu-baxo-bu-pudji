import { ResponseJson } from '@/server/service/GateWay';

import { NextRequest } from 'next/server'
import { TContext } from "@/interface/server/param";
import { deliveryController } from "@/server/controller/delivery.controller";

export async function GET(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => deliveryController.findAll(request, context),
		"GET",
		'delivery'
	)
}

export async function POST(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => deliveryController.createOne(request, context),
		"POST",
		'delivery',
	)
}

