import { NextRequest, NextResponse } from 'next/server'
import Service                       from '@/server/service/produk';
import { notValid }                  from '@/server/exeption/notValid';
import Control                       from '@/server/controller/produk';

export async function GET() {

  try {
    const dataControl = await Control.find()
    return NextResponse.json( { msg: "Success GET", data: dataControl } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error GET", error: e } )
  }
}

export async function POST( request: NextRequest, ) {
  try {
    const json    = await request.json();

    const dataControl = await Control.create( json )
    return NextResponse.json( { msg: "Success Create", data: dataControl } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}
