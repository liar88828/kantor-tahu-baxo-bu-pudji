import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { deliveryController } from "@/server/controller/delivery.controller"
import {ResponseJson} from "@/lib/requestHelper";

export async function GET(request: NextRequest, context: TContext) {
  return await ResponseJson(
    async () => deliveryController.findAll(request, context),
    "GET",
    "delivery"
  )
}

export async function POST(request: NextRequest, context: TContext) {
  return await ResponseJson(
    async () => deliveryController.createOne(request, context),
    "POST",
    "delivery"
  )
}
