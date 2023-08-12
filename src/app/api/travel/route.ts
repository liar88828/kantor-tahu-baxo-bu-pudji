import { NextResponse }  from 'next/server'
import Control           from '@/server/controller/travel';
import { extractData }   from '@/server/service/extractForm';
import { setData }       from '@/lib/utils/formatData';
import { newError }      from '@/server/exeption/errorHandler';
import { validImage }    from '@/lib/validation/image';
import type { Textract } from '@/entity/server/image';

export async function GET() {
  try {
    const dataControl = await Control.find()
    return NextResponse.json( {
      msg: "Success GET",
      data: dataControl
    } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error GET", error: e } )
  }
}

export async function POST( request: Request ) {
  try {
    const data: Textract = await extractData( request )
    if( !data ) {
      throw new newError( "Fail Create", )
    }

    const json: TTravel = setData( data.dataImage.file, data.json, "img/travel/" )
    const dataControl   = await Control.create( data.json )
    if( !dataControl ) {
      throw new newError( "Fail Create DataBase", )
    }
    console.log( dataControl )
    await validImage( data.dataImage.buffer, "public/img/travel", json.img ||
      "", "POST", data )

    return NextResponse.json( { msg: "Success Create", data: dataControl } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}
