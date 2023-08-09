import { toast } from 'react-toastify';

export const notify = ( msg: string, option: "error" | "success" ) => {

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
