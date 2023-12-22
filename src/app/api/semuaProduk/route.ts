import { prisma, TPSemuaProduct } from '@/servers/data-source/prisma/config';

import { NextRequest, NextResponse } from 'next/server'
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';

import { errorEmptyID } from '@/lib/exeption/errorResponse';
import RepoSemuaProduk from '@/servers/data-source/prisma/SemuaProduk';
import { Input } from '@/servers/presentation/web/Input';
import { Output } from '@/servers/presentation/web/Output';
import SemuaProductController from '@/servers/domain/controllers/SemuaProduk';
import { IControlSemuaProduk } from '@/servers/domain/interface/controllers/SemuaProduk';

const c: IControlSemuaProduk = new SemuaProductController(
  new RepoSemuaProduk( prisma.semuaProduct ),
  new ValidationService<TPSemuaProduct>( new ValidationSchema().semuaProdukSchema ),
)
const to                     = "semuaProduk"
export async function GET( request: NextRequest ) {
  const { id, option, method } = await Input( request );
  console.log( `route api ${ method } semuaProduk` )

  if( option === "dashboard" ) {
    return await Output( "GET", () => c.dashboard() )
  }
  if( id === "all" ) {
    return await Output( "GET", () => c.find() )
  }
  if( id.length > 10 ) {
    return await Output( "GET", () => c.findById( id ), )
  }
  return NextResponse.json( errorEmptyID( method ) )

}

export async function POST( request: NextRequest, ) {
  const { json, method }: { json: TPSemuaProduct, method: string } = await Input( request );
  console.log( `route api ${ method } semuaProduk` )

  // console.log(json)
  return await Output( "POST", () => c.create( json, json.orderanId ), )
}

export async function DELETE( request: NextRequest ) {
  const { id, method } = await Input( request );
  console.log( `route api ${ method } semuaProduk` )

  if( id.length > 10 ) {
    return await Output( "DELETE", () => c.destroy( id ) )
  }
  return NextResponse.json( errorEmptyID( method ) )

}

export async function PUT( request: NextRequest ) {
  const { json, id, method } = await Input( request );
  console.log( `route api ${ method } semuaProduk` )

  if( id.length > 10 ) {
    return await Output( "PUT", () => c.edit( json, id ) )
  }
  return NextResponse.json( errorEmptyID( method ) )
}
