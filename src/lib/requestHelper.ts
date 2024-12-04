import { TContext } from "@/interface/server/param"
import { NextRequest } from "next/server"

export async function getId({ params }: TContext) {
  const param = await params
  if (param) {
    return param.id
  }
  throw new Error("please add id")
}

export async function getJson(request: NextRequest) {
  return request.json()
}

export function getParams(request: NextRequest, text: string) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  return searchParams.get(text) ?? undefined
}

export function getParamsThrow(request: NextRequest, text: string) {
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)
  const value = searchParams.get(text)
  if (!value) {
    throw new Error(`please add a params : ${text}`)
  }
  return value
}
//ResponseJson
import { NextResponse } from "next/server"
import Zod from "zod"
import { Prisma } from ".prisma/client"

export async function ResponseJson(
  fun: any,
  method: TMethod,
  _from: ToModel = "not implement",
  code: number = 200
) {
  console.info(`method : ${method} from : ${_from}`)

  try {
    const controls: any = await fun()
    const response = {
      msg: `${method} ${_from} success`,
      data: controls,
      code: code,
    }
    return NextResponse.json(response, { status: code })
  } catch (err: unknown) {
    if (err instanceof Zod.ZodError) {
      return NextResponse.json(
        {
          msg: `Error on ${method}`,
          error: err.issues,
          code: 400,
        },
        { status: 400 }
      )
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json(
        {
          msg: `Error on ${method}`,
          error: err,
          code: 400,
        },
        { status: 400 }
      )
    }
    if (err instanceof Prisma.PrismaClientUnknownRequestError) {
      return NextResponse.json(
        {
          msg: `Error on ${method}`,
          error: err,
          code: 400,
        },
        { status: 400 }
      )
    }
    return NextResponse.json(
      {
        msg: `Error on ${method}`,
        error: err,
        code: 500,
      },
      { status: 500 }
    )
  }
}

import {
  PrismaClientValidationError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime/library"
import { info, type error } from "console"
import { json } from "stream/consumers"
import { ZodError } from "zod"
import type { TMethod, ToModel } from "../interface/Utils"
