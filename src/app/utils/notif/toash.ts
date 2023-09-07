import { toast } from 'react-toastify';

export const notifyData = <T>( msg: string, data: any | undefined | T = {}, ) => {
  console.log( msg )
  if( typeof msg == "string" ) {
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
      // console.log(msgS)
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
      console.log( "object success" )
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
      console.log( "object error" )
      if( data.error.meta ) {
        console.log( "object error detail" )
        console.log( data.error )
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

