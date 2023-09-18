import { toast } from 'react-toastify';

export const notifyData = <T>( msg?: string, data: any | undefined | T = {}, ) => {
  console.info( msg )
  if( typeof msg === "string" ) {
    if( msg.toLowerCase().includes( "succ" ) ) {
      toast.success( msg, {
        position       : "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick   : true,
        pauseOnHover   : true,
        theme          : "light",
      } )
    }

    if( msg.toLowerCase().includes( "fail" ) || msg.toLowerCase().includes( "error" ) ) {
      // const msgS = ` ${ data[ 0 ].path[ 0 ] } is ${ data[ 0 ].message } `
      // console.error(msgS)
      toast.error( msg, {
        position       : "top-right",
        autoClose      : 3000,
        hideProgressBar: false,
        closeOnClick   : true,
        pauseOnHover   : true,
        theme          : "dark",
      } );
    }
  }

  if( data.msg ) {
    if( data.msg.toLowerCase().includes( "succ" ) ) {
      console.info( "object success" )
      toast.success( data.msg, {
        position: "top-right",
        autoClose      : 5000,
        hideProgressBar: false,
        closeOnClick   : true,
        pauseOnHover   : true,
        theme   : "light",
      } )
    }
    if( data.msg.toLowerCase().includes( "err" ) || data.msg.toLowerCase().includes( "fail" ) ) {
      console.error( "object error" )
      if( data.error.meta ) {
        console.error( "object error detail" )
        console.error( data.error )
        toast.error( data.error.meta.cause + " " + data.error.name, {
          position       : "top-right",
          autoClose      : 3000,
          hideProgressBar: false,
          closeOnClick   : true,
          pauseOnHover   : true,
          theme          : "light",
        } )
      }
      if( !data.error.meta ) {
        toast.error( data.msg, {
          position       : "top-right",
          autoClose      : 3000,
          hideProgressBar: false,
          closeOnClick   : true,
          pauseOnHover   : true,
          theme          : "light",
        } )
      }
    }
  }

}

