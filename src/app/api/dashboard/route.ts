import { Input, Output } from '@/server/service/GateWay';
//
import { prisma, TPSemuaProduct } from '@/server/models/prisma/config';
//
import { NextRequest, NextResponse } from 'next/server'
import SemuaProductController2 from '@/server/controller/SemuaProduk';
import RepoSemuaProduk from '@/server/repository/SemuaProduk';
import { IControlSemuaProduk2 } from '@/interface/controller/SemuaProduk';
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';

const c: IControlSemuaProduk2 = new SemuaProductController2(
  new RepoSemuaProduk( prisma.semuaProduct ),
  new ValidationService<TPSemuaProduct>( new ValidationSchema().semuaProdukSchema ),
)

export async function GET( request: NextRequest, ) {
  const { id, pathname, method } = await Input( request )
  if( id === "all" ) {
    if( pathname === "/api/dashboard" ) {
      return Output( "GET", () => c.dashboard(), )
    }
  }
  return NextResponse.json( { msg: `Error ${ method }`, error: "Cannot empty ID" } )

}

