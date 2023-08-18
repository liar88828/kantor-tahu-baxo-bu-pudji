import { toast } from 'react-toastify';

export const notify = () => toast.success( '🦄 Wow so easy!', {
  position       : "top-right",
  autoClose      : 5000,
  hideProgressBar: false,
  closeOnClick   : true,
  pauseOnHover   : true,
  theme          : "light",
} );