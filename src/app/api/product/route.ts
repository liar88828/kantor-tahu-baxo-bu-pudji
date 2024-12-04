import { ResponseJson } from '@/server/service/GateWay';

import { NextRequest } from 'next/server'
import { productController } from "@/server/controller/product.controller";
import { TContext } from "@/interface/server/param";

export async function GET(request: NextRequest, context: TContext) {
  
  return await ResponseJson(
    async () => productController.findAll(request, context),
    "GET",
    'product')
  
}

export async function POST(request: NextRequest, context: TContext) {
  
  return await ResponseJson(
    async () => productController.createOne(request, context),
    "POST",
    'product')
}

