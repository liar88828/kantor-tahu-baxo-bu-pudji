import { Input, Output } from '@/server/service/GateWay';
import { prisma, TPSemuaProduct } from '@/server/models/prisma/config';

import { NextRequest, NextResponse } from 'next/server'
import RepoSemuaProduk from '@/server/repository/SemuaProduk';
import SemuaProductController2 from '@/server/controller/SemuaProduk';
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';

import { IControlSemuaProduk2 } from '@/interface/controller/SemuaProduk';

const c: IControlSemuaProduk2 = new SemuaProductController2(
  new RepoSemuaProduk( prisma.semuaProduct ),
  new ValidationService<TPSemuaProduct>( new ValidationSchema().semuaProdukSchema ),
)

export async function GET( request: NextRequest ) {
  const { id, option } = await Input( request );

  if( option === "dashboard" ) {
    return await Output( "GET", () => c.dashboard() )
  }
  if( id === "all" ) {
    return await Output( "GET", () => c.find() )
  }
  if( id.length > 10 ) {
    return await Output( "GET", () => c.findById( id ), )
  }
  return NextResponse.json( { msg: "Error EDIT", error: "Cannot empty ID" } )

}

export async function POST( request: NextRequest, ) {
  const { json }: { json: TPSemuaProduct } = await Input( request );
  // console.log(json)
  return await Output( "POST", () => c.create( json, json.orderanId ), )
}

export async function DELETE( request: NextRequest ) {
  const { id } = await Input( request );
  if( id.length > 10 ) {
    return await Output( "DELETE", () => c.destroy( id ) )
  }
  return NextResponse.json( { msg: "Error EDIT", error: "Cannot empty ID" } )

}

export async function PUT( request: NextRequest ) {
  const { json, id } = await Input( request );
  // console.log(id)
  if( id.length > 10 ) {
    return await Output( "PUT", () => c.edit( json, id ) )
  }
  return NextResponse.json( { msg: "Error EDIT", error: "Cannot empty ID" } )
}
