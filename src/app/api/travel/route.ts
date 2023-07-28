import { NextResponse } from 'next/server'
import Control from '@/server/controller/travel';
import { TTravel } from '@/entity/travel';
import { TYPE }    from '@/server/models/dataAccess/Travel';

export async function GET() {
  try {
    const dataControl = await Control.find()
    return NextResponse.json( {
      msg: "Success GET",
      data: dataControl
    } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error GET", error: e } )
  }
}

export async function POST( request: Request ) {
  const json: TYPE = await request.json();
  try {
    const dataControl = await Control.create( json )
    return NextResponse.json( {
      msg: "Success Create", data: dataControl //valid: dataControl, success: dataControl
    } )
  } catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}
