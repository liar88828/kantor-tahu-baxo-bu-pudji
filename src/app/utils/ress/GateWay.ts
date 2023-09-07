"use server"

import { sendData } from '@/app/utils/ress/sendApi';
import { setIdModel } from '@/lib/utils/formatId';
import { getId } from '@/app/bank/setBank';
import { errorData } from '@/app/utils/ress/errorData';

export type ToModel = "bank" | "orderan" | "product" | "travel";

export async function GateWay<T>(
  method: "PUT" | "POST" | "GET" | "DELETE",
  to: ToModel,
  id: string | "all" = "",
  data: any          = {},
): Promise<{
  data: any,
  msg: string
} | any> {
  //
  // --------------------
  //
  if( method === "GET" ) {
    if( id.length > 10 ) {
      return await getId( to, id );
    }

    if( id === "all" || id === "" ) {
      return await sendData<T>( to, "GET", id )
    }
  }
  //
  // --------------------
  //
  if( method === "POST" ) {
    data.id = await setIdModel( to, data )
    console.log( data.id )
    return await sendData<T>( to, "POST", "", data );
  }
  //
  // --------------------
  //
  if( method === "PUT" ) {
    console.log( data )
    return await sendData<T>( to, "PUT", id, data );
  }
  //
  // --------------------
  //
  if( method === "DELETE" ) {
    return await sendData<T>( to, "DELETE", id );
  }
  return {
    data: errorData( to ),
    msg : "error"
  }
}