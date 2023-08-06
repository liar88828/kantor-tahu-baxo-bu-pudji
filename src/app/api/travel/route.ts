import { NextResponse } from 'next/server'
import Control          from '@/server/controller/travel';
import { extractData }  from '@/server/service/extractForm';
import { setData }      from '@/lib/utils/formatData';
import { newError }     from '@/server/exeption/errorHandler';
import { validImage }   from '@/lib/validation/image';
import { TTravel }      from '@/entity/client/travel';

type Textract =
  { dataImage: { file: Blob, buffer: Buffer }, json: any }
  | undefined

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
      throw new newError( "Fail Create", "Invalid Value" )
    }

    const json: TTravel = setData( data.dataImage.file, data.json, "img/travel/" )
    const dataControl   = await Control.create( data.json )
    if( !dataControl ) {
      throw new newError( "Fail Create DataBase", "Invalid Value" )
    }

    validImage( data.dataImage.buffer, "public/img/travel", json.img || "" )

    return NextResponse.json( { msg: "Success Create", data: dataControl } )
  }
  catch ( e ) {
    return NextResponse.json( { msg: "Error Create", error: e } )
  }
}
