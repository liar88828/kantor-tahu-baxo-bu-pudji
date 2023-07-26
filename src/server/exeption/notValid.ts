import { NextApiResponse } from 'next';
import { TOrderValid } from '@/entity/server/orderan';
import { errorHandler } from '@/server/exeption/errorHandler';

export const notValid = ( res: NextApiResponse, repoOrder: TOrderValid ): TOrderValid => {
  // Set the status code and error message in the response
  const statusCode = 401;
  const message = 'Internal Server Error';
  // validate server
  if( !repoOrder.valid ) errorHandler( res, statusCode, message )
  if( !repoOrder.valid ) throw new Error( "Data is not valid " )
  // Log the error (you can customize this part as per your needs)
  console.error( 'API Error:' + repoOrder.valid );
  return repoOrder
};

