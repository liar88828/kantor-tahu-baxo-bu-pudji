import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/lib/requestHelper"
import {productController} from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
  return await ResponseJson(
    async () => productController.findAll(request, context),
    "GET",
    "product"
  )
}

export async function POST(request: NextRequest, context: TContext) {
  return await ResponseJson(
    async () => productController.createOne(request, context),
    "POST",
    "product"
  )
}
