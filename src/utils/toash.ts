import { toast } from 'react-toastify';

type ErrorZod = {
  code: string
  exact: boolean
  inclusive: boolean
  maximum: number
  message: string
  path: string[]
  type: string
}

export function errorToast( text: string ) {
  toast.error( text, {
    position       : "top-right",
    autoClose      : 3000,
    hideProgressBar: false,
    closeOnClick   : true,
    pauseOnHover   : true,
    theme          : "dark",
  } );
}

function successToast( text: string ) {
  toast.success( text, {
    position       : "top-right",
    autoClose      : 3000,
    hideProgressBar: false,
    closeOnClick   : true,
    pauseOnHover   : true,
    theme          : "light",
  } )
}

export const notifyData = <T>(
  msg?: string,
  data: any | undefined | T = {},
) => {
  console.log( "toast" )

  if( msg === "" ) {
    if( Array.isArray( data ) ) {
      errorToast( `The ${ data[ 0 ].path[ 0 ] } is ${ data[ 0 ].code } must be ${ data[ 0 ].minimum }` );
    }
  }

  if( typeof msg === "string" ) {
    if( msg.toLowerCase().includes( "succ" ) ) {
      successToast( msg )
    }
    if( msg.toLowerCase().includes( "fail" ) || msg.toLowerCase().includes( "error" ) || msg.includes( "atal" ) ) {
      errorToast( msg )
    }
  }

  if( typeof data === "object" ) {
    if( typeof data.msg === "string" ) {

      const text = JSON.stringify( data.msg )

      // console.log( text )
      if( text.includes( "ccess" ) ) {
        return successToast( data.msg )
      }
    }
    if( Array.isArray( data.data ) ) {
      data.data.map( ( d: ErrorZod ) => {
        // console.log(`The ${ d.path[ 0 ] } is error because ${ d.message }`)
        errorToast( `The ${ d.path[ 0 ] } is error because ${ d.message }` )
      } )
    }
  }
}

