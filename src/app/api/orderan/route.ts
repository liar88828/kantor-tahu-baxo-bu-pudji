import { NextRequest, NextResponse } from 'next/server'
import Seed, { prisma }              from '@/server/models/prisma/config';

const seed = new Seed()

export async function GET() {
  try {

    const dataControl = await Control.find()
    return NextResponse.json( {
      msg : "Success GET",
      data: await seed.ShowOrderan()
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error GET", error: e } )
  }
}

export async function POST( request: NextRequest, ) {
  try {
    const json = await request.json();
    console.log( "post" )

    // const dataControl = await Control.create( json )
    return NextResponse.json( {
      msg : "Success Create",
      data: await seed.CreateOrderan()
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}
