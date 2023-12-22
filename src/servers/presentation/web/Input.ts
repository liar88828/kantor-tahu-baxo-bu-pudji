import { NextRequest } from 'next/server';
import { TSend } from '@/entity/servers/webs/TSend';
import { TMethod } from '@/entity/Utils';
import { setData, TraPro } from '@/lib/FileSystem/formatData';
import { extractData } from '@/lib/FileSystem/extractForm';
import { fileSystem } from '@/lib/FileSystem/fileSystem';
import { validImage } from '../../../lib/validation/image';
import { debugs } from '../../../../config.dev';

export async function Input( request: NextRequest ): Promise<TSend | any> {
  const url          = new URL( request.url );
  const method       = request.method as TMethod
  const pathname     = url.pathname
  const searchParams = new URLSearchParams( url.search );
  const id           = searchParams.get( "id" ) as string
  const option       = searchParams.get( "option" ) as string
  const value        = searchParams.get( "value" ) as string
  if( option ) {

    console.log( "-------option------" )
    // console.log( option )
    // console.log( json )

  }
  const send: TSend = { id, option, value, pathname, method }

  const withFile    = async (
    request: NextRequest,
    method: "POST" | "PUT",
    paths: string | TraPro
  ) => {
    console.log( "with file" )
    const data: TExtract = await extractData( request )
    if( data ) {
      if( method === "PUT" ) {
        await fileSystem( data.json.img )
      }
      const jsonImage: any = setData(
        data.dataImage.file,
        data.json,
        `/img/${ paths }/`,
        paths )

      jsonImage.img = jsonImage.img?.replaceAll( "/api/", "" )
      const path    = jsonImage.img?.split( "/" )[ 2 ]

      await validImage( data.dataImage.buffer, `public/img/${ path }`, jsonImage.img || "", method, data )
      return data.json
    }
  }

  if( debugs ) {
    console.log( value, option, id )
  }

  if( method === "POST" && ( pathname.includes( "travel" ) || pathname.includes( "product" ) ) ) {
    console.info( "test POST input" )
    if( option.includes( "text" ) ) {
      return { ...send, json: await request.json() };
    }

    if( option.includes( "file" ) ) {
      const json = await withFile( request, "POST", pathname )
      return { ...send, json };

    }
  }
  // travel and product
  if( method === "PUT" && ( pathname.includes( "travel" ) || pathname.includes( "product" ) ) ) {
    console.info( "test PUT input" )
    if( option.includes( "text" ) ) {
      console.info( `option : ${ option }` )
      return { ...send, json: await request.json() };
    }

    if( option.includes( "file" ) ) {
      console.info( `option : ${ option }` )
      const json = await withFile( request, "PUT", pathname )
      return { ...send, json };
    }
  }

  // table and orderan
  else if( method === "DELETE" && ( pathname.includes( "table" ) || pathname.includes( "orderan" ) ) ) {
    const json: string[] = await request.json()
    console.info( json )
    if( Array.isArray( json ) ) {

      console.log( "is array" )
      return { ...send, json };
    }
    console.log( " array" )

    return { ...send };

  }

  const json = method !== "GET" ? await request.json() : {}
  return { ...send, json };
}