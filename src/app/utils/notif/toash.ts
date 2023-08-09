import { toast } from 'react-toastify';

export const notifBaru = ( msg: string ) => {

  if( msg.toLowerCase().includes( "suc" ) ) {
    return toast.success( msg, {
      position       : "top-right",
      autoClose      : 5000,
      hideProgressBar: false,
      closeOnClick   : true,
      pauseOnHover   : true,
      theme          : "light",
    } )

  }
  else if( msg.toLowerCase().includes( "err" ) ) {
    return toast.error( msg, {
      position       : "top-right",
      autoClose      : 5000,
      hideProgressBar: false,
      closeOnClick   : true,
      pauseOnHover   : true,
      theme          : "dark",
    } );
  }
  else {
    return toast.error( "Something Wrong", {
      position       : "top-right",
      autoClose      : 5000,
      hideProgressBar: false,
      closeOnClick   : true,
      pauseOnHover   : true,
      theme          : "dark",

    } )
  }
}
export const notify    = ( msg: string, option: "error" | "success" ) => {
  if( msg.includes( "success" ) )

    if( option === 'success' ) {
      toast.success( msg, {
        position       : "top-right",
        autoClose      : 5000,
        hideProgressBar: false,
        closeOnClick   : true,
        pauseOnHover   : true,
        theme          : "light",
      } )
    }
    else if( option === 'error' ) {
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

