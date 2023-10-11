import { Input, Output } from '@/servers/presentation/Web';
import { prisma, TPSemuaProduct } from '@/servers/data-source/prisma/config';
import { NextRequest, NextResponse } from 'next/server'
import SemuaProductController from '@/servers/use-cases/controller/SemuaProduk';
import { IControlSemuaProduk } from '@/servers/interface/controller/SemuaProduk';
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';
import { errorEmptyID } from '@/lib/exeption/errorResponse';
import RepoSemuaProduk from '@/servers/data-source/prisma/SemuaProduk';

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
      return Output( "GET", () => c.dashboard() )
    }
  }
  return NextResponse.json( errorEmptyID( method ) )

}

