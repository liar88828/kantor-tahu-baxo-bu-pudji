import { ResponseJson } from '@/server/service/GateWay';
import { NextRequest } from 'next/server'

import { TContext } from "@/interface/server/param";
import { orderController } from "@/server/controller/order.controller";

export async function GET(request: NextRequest, context: TContext) {
  return ResponseJson(
    async () => orderController.findAll(request, context),
    "GET",
    'order')
}

export async function POST(request: NextRequest, context: TContext) {
  
  return ResponseJson(() => orderController.createOne(request, context),
    "POST",
    'order')
}


