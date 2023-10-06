"use server"

import { sendData } from './SendApi';
import { ErrorData } from './ErrorData';
import { ValidationModel } from '@/app/utils/ress/ValidationModel';
import { TMethod, ToModel } from '@/entity/Utils';
import { _test_ } from '../../../../config.dev';

import { errorData, errorEmptyData, errorEmptyID } from '@/lib/utils/errorResponse';
import { setIdModel } from '@/lib/utils/formatId';
import { getId } from '@/app/utils/ress/setBank';

export const isObjectEmpty = ( objectName: TMethod ) => {
  return Object.keys( objectName ).length === 0
}

export async function GateWay<T>(
  method: TMethod,
  to: ToModel,
  id: string | "all"               = "",
  data: any                        = {},
  option: string                   = "",
  stores: "noCache" | "revalidate" = "revalidate",
): Promise<{
  data: any,
  msg: string
} | any> {
  try {

    if(
      [ "PATCH", "PUT", "GET", "DELETE" ].includes( method ) &&
      ( id !== "all" && id.length < 3 )
    ) {
      console.error( `${ method } Wrong Id GateWay` );
      return errorEmptyID( method );
    }
    //
    if( option === "file" ) {
      console.log( `${ method } file GateWay` )
      if( method === "POST" || method === "PUT" ) {
        return await sendData<T>( to, method, id, option, data )
      }
    }

    if( ( method === "POST" || method === "PUT" ) && isObjectEmpty( data ) ) {
      console.error( `${ method } is empty GateWay` );
      return errorEmptyData( method );
    }

    if( method === "POST" || method === "PUT" ) {
      if( typeof data === "object" ) {
        if( method === "POST" ) {
          if( typeof data.id === "string" ) {
            if( data.id.length < 20 ) {
              data.id = setIdModel( to, data )
            }
          }
        }

        const validData = ValidationModel( to, data );
        if( Array.isArray( validData ) ) {
          console.error( "is error zod validation gateway by array" )
          if( _test_ ) {
            return errorData( method, validData )
          }
          throw errorData( method, validData )
        }

        else {
          const dataString = JSON.stringify( validData )
          if( dataString.includes( "equired" ) &&
            dataString.includes( "essage" ) &&
            dataString.includes( "code" )
          ) {
            console.error( "is error zod validation gateway by string" )
            return errorData( method, validData )
          }
        }

        console.info( "success client GateWay" )
        return await sendData<T>( to, method, id, option, validData );

      }
    }
    if( method === "GET" ) {
      if( id.length > 10 && data === "only" ) {
        console.info( "only" )
        return await getId( to, id );
      }
      if( id.length > 3 || id === "all" || id === "" ) {
        console.info( "all" )
        return await sendData<T>( to, "GET", id, option, {}, stores
          //"noCache"
        );
      }
    }
    if( method === "DELETE" ) {
      console.log( id, data )
      return await sendData<T>( to, "DELETE", id, "", data );
    }
    //
    // //
    // // --------------------
    // //
    // if( method === "POST" ) {
    //   if( !JSON.stringify( data ).includes( "equired" )
    //     && !JSON.stringify( data ).includes( "ode" )
    //     && !JSON.stringify( data ).includes( "essage" )
    //   ) {
    //     console.info( "---POST-----" )
    //     console.info( data )
    //     return await sendData<T>( to, "POST", "", option, data );
    //   }
    //   console.error( "--ress--POST--" )
    //   console.error( data )
    //   if( Array.isArray( data ) ) {
    //     return errorData( method, data )
    //   }
    //   return data
    // }
    // //
    // // --------------------
    // //
    // if( method === "PUT" ) {
    //
    //   if( !JSON.stringify( data ).includes( "equired" )
    //     && !JSON.stringify( data ).includes( "ode" )
    //     && !JSON.stringify( data ).includes( "essage" )
    //   ) {
    //     console.info( "error" )
    //     console.info( data )
    //     return await sendData<T>( to, "PUT", id, option, data );
    //   }
    //   console.error( "--ress--PUT--" )
    //   console.error( data )
    //   return data
    // }
    return errorData( method, await ErrorData( to ), )
  }
  catch ( e ) {
    console.error( "error object client gateway" )
    if( typeof e === "object" ) {
      console.log(e)
      return e
    }
    console.error( "error normal client gateway" )
    return errorData( method, await ErrorData( to ), )

  }
}

