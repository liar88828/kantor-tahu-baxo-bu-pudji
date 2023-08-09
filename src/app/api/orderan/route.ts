import { NextRequest, NextResponse } from 'next/server'
import Seed                          from '@/server/models/prisma/config';
import Control                       from '@/server/controller/orderan';
import { TOrderServer }              from '@/entity/server/orderan';

const seed = new Seed()

export async function GET() {
  try {
    return NextResponse.json( {
      msg: "Success GET",
      // data: await seed.ShowOrderan()
      data: await Control.find()
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error GET", error: e } )
  }
}

export async function POST( request: NextRequest, ) {
  try {
    const data: TOrderServer = await request.json();
    // console.log( data )

    const dataControl = await Control.create( data )
    console.log( "success" )
    console.log( dataControl )
    return NextResponse.json( {
      msg : "Success Create",
      data: dataControl
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}
