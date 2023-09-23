import { Input, Output } from '@/server/service/GateWay';
import { prisma, TPSemuaProduct } from '@/server/models/prisma/config';
import { NextRequest, NextResponse } from 'next/server'
import SemuaProductController from '@/server/controller/SemuaProduk';
import RepoSemuaProduk from '@/server/repository/SemuaProduk';
import { IControlSemuaProduk } from '@/interface/controller/SemuaProduk';
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';
import { errorEmptyID } from '@/lib/utils/errorResponse';

const c: IControlSemuaProduk = new SemuaProductController(
  new RepoSemuaProduk( prisma.semuaProduct ),
  new ValidationService<TPSemuaProduct>( new ValidationSchema().semuaProdukSchema ),
)
const to                     = "dashboard"

export async function GET( request: NextRequest ) {
  const { id, pathname, method } = await Input( request )
  console.log( `route api ${ method } dashboard` )
  if( id === "all" ) {
    if( pathname === "/api/dashboard" ) {
      return Output( "GET", () => c.dashboard(), )
    }
  }
  return NextResponse.json( errorEmptyID( method ) )

}

