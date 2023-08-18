import { toast } from 'react-toastify';

export const notifBaru  = ( msg: string, data: any[] = [] ) => {

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
export const notifyData = ( msg: string ) => {
  // console.log(msg)
  if( msg.toLowerCase().includes( "success" ) ) {
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

