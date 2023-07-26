import { NextApiResponse } from 'next';

export const errorHandler = ( res: NextApiResponse, statusCode: number, message: string ) => {
  // Log the error (you can customize this part as per your needs)
  console.error( 'API Error:', message );

  // Set the status code and error message in the response
  // const statusCode = 500;
  // const message = 'Internal Server Error';

  // Send the error response to the client
  res.status( statusCode ).json( { error: message } );
};

