"use server"

import { sendData } from './SendApi';
import { getId } from './setBank';
import { ErrorData } from './ErrorData';
import { validationData } from '@/app/utils/ress/ValidationModel';
import { TMethod, ToModel } from '@/entity/Utils';
import { debugs } from '../../../../config.dev';

export const isObjectEmpty = ( objectName: TMethod ) => {
  return Object.keys( objectName ).length === 0
}

export async function GateWay<T>(
  method: TMethod,
  to: ToModel,
  id: string | "all" = "",
  data: any          = {},
  option: string = "",
): Promise<{
  data: any,
  msg: string
} | any> {

  if( method === "PATCH"
    || method === "PUT"
    || method === "GET"
    || method === "DELETE" ) {
    if( id !== "all" ) {

      if( id.length < 3 ) {
        console.error( "wrong Id" )
        return { msg: `Error ${ method }`, error: 'Cannot empty ID' }
      }
    }
  }

  if( method === "POST" || method === "PUT" ) {
    console.info( "-------" )
    console.info( "gateway" )

    // console.log(data)

    if( isObjectEmpty( data ) ) {
      console.error( "is empty" )
      return { msg: `Error ${ method }`, error: 'Cannot empty data' }
    }

    const json = validationData( method, to, data )
    // console.debug("-------")
    // console.debug(data)
    console.debug( "--json----" )
    console.debug( json )
    console.debug( "---json----" )

    if( debugs ) {
      console.debug( json )
      console.debug( JSON.stringify( json ).includes( "equired" )
        || !JSON.stringify( json ).includes( "ode" ) )
    }
    //
    // --------------------
    //
    if( method === "POST" ) {

      if( !JSON.stringify( json ).includes( "equired" )
        || !JSON.stringify( json ).includes( "ode" )
        || !JSON.stringify( json ).includes( "essage" )
      ) {
        // console.info( "---POST-----" )
        // console.log(json)
        return await sendData<T>( to, "POST", "", option, json );
      }

      return json
    }
    //
    // --------------------
    //
    if( method === "PUT" ) {

      if( !JSON.stringify( json ).includes( "equired" )
        || !JSON.stringify( json ).includes( "ode" )
        || !JSON.stringify( json ).includes( "essage" )

      ) {
        console.error( "error" )
        console.log( data )
        return await sendData<T>( to, "PUT", id, option, json );
      }
      console.info( "success" )
      // console.log(data)

      return json
    }

  }

  if( debugs ) {
    console.log( method, )
    console.log( to, )
    console.log( id, )
    console.log( data, )
    console.log( option, )

  }

  //
  // --------------------
  //
  if( method === "GET" ) {

    if( id.length > 10 && data === "only" ) {
      return await getId( to, id );
    }

    if( id.length > 3 ) {
      return await sendData<T>( to, "GET", id, option )
    }

    if( id === "all" || id === "" ) {
      return await sendData<T>( to, "GET", id, option )
    }
  }

  //
  // --------------------
  //
  if( method === "DELETE" ) {
    return await sendData<T>( to, "DELETE", id );
  }

  return {
    data: ErrorData( to ),
    msg : "error"
  }
}

