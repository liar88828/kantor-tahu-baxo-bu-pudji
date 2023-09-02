import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const notifyData = ( msg: string, data: any = {}, ) => {
  // console.log( "-------------" )
  console.log( msg )
  // console.log( "-------------" )
  if( typeof msg == "string" ) {
    if( msg.toLowerCase().includes( "succ" ) ) {
      toast.success( msg, {
        position       : "top-right",
        autoClose      : 5000,
        hideProgressBar: false,
        closeOnClick   : true,
        pauseOnHover   : true,
        theme          : "light",
      } )
    }

    if( msg.toLowerCase().includes( "fail" ) || msg.toLowerCase().includes( "error" ) ) {
      // const msgs = ` ${ data[ 0 ].path[ 0 ] } is ${ data[ 0 ].message } `
      // console.log(msgs)
      toast.error( msg, {
        position       : "top-right",
        autoClose      : 5000,
        hideProgressBar: false,
        closeOnClick   : true,
        pauseOnHover   : true,
        theme          : "dark",
      } );
    }
  }

}

export function useNotifyEffect( path: string[] | string ) {
  useEffect( () => {
    if( Array.isArray( path ) ) {
      notifyData( "success " + path[ 1 ] + " " + path[ 2 ] )
    }
    else {
      notifyData( path )
    }

  }, [] )
}
