import { NextApiResponse } from 'next';
import { TOrderSuccess } from '@/entity/server/orderan';
import { errorHandler } from '@/server/exeption/errorHandler';

export const notSuccess = ( res: NextApiResponse, repoOrder: TOrderSuccess ): TOrderSuccess => {
  // Set the status code and error message in the response
  const statusCode = 401;
  const message = 'Internal Server Error';
  // Send the error response to the client
  if( !repoOrder ) errorHandler( res, statusCode, message )
  // validate server
  if( !repoOrder.valid ) throw new Error( "Data is not valid " )
  if( !repoOrder.success ) throw new Error( "Data is not valid " )
  // Log the error (you can customize this part as per your needs)
  console.error( 'API Error:' + repoOrder.success );

  return repoOrder

};
