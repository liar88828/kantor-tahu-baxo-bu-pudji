import { ResponseJson } from '@/server/service/GateWay';

import { NextRequest } from 'next/server';
import { paymentController } from '@/server/controller/payment.controller';
import { TContext } from "@/interface/server/param";

export async function GET(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => paymentController.findAll(request, context),
		"GET",
		"payment"
	)
}

export async function POST(request: NextRequest, context: TContext) {
	return await ResponseJson(
		async () => paymentController.createOne(request, context),
		"POST",
		"payment"
	)
}

