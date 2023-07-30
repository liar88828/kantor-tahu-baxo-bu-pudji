import { NextRequest, NextResponse } from 'next/server'
import Control                       from '@/server/controller/semuaProduk';

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
    const json        = await request.json();
    const dataControl = await Control.create( json, json.id )
    return NextResponse.json( { msg: "Success Create", data: dataControl } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}
