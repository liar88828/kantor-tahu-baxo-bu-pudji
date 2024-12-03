import { NextResponse } from 'next/server';
import { TMethod, ToModel } from '@/entity/Utils';
import Zod from 'zod';
import { Prisma } from ".prisma/client";

export async function ResponseJson(
  fun: any,
  method: TMethod,
  _from: ToModel = 'not implement',
  code: number = 200,
) {
  console.info(`method : ${ method } from : ${ _from }`)

  try {
    const controls: any = await fun()
    const response = {
      msg: `${ method } ${ _from } success`,
      data: controls,
      code: code,
    }
    return NextResponse.json(response, { status: code });
  }

  catch ( err: unknown ) {
    
    if (err instanceof Zod.ZodError) {
      
      return NextResponse.json({
          msg: `Error on ${ method }`,
          error: err.issues,
          code: 400
        },
        { status: 400 }
      );
    }
    
    if (err instanceof Prisma.PrismaClientValidationError) {
      return NextResponse.json({
        msg: `Error on ${ method }`,
        error: err,
        code: 400
      }, { status: 400 });
    }
    if (err instanceof Prisma.PrismaClientUnknownRequestError) {
      return NextResponse.json({
        msg: `Error on ${ method }`,
        error: err,
        code: 400
      }, { status: 400 });
    }
    return NextResponse.json({
      msg: `Error on ${ method }`,
      error: err,
      code: 500
    }, { status: 500 });
  }
}
