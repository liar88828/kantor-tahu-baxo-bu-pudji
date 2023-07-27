import { NextRequest, NextResponse } from 'next/server'
import Control from '@/server/controller/produk';
import Service from '@/server/service/produk';
import { notValid } from '@/server/exeption/notValid';

export async function GET() {
  try {
    const dataControl = await Control.find()
    return NextResponse.json( { msg: "Success GET", data: dataControl } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error GET", error: e } )
  }
}

export async function POST( request: NextRequest, ) {
  try {
    const json = await request.json();
    const serData = Service.create( json )
    const valid = notValid( serData )
    const dataControl = await Control.create( valid )
    return NextResponse.json( { msg: "Success Create", data: dataControl } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}
