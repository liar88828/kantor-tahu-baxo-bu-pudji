import { NextApiRequest, NextApiResponse } from 'next';
import multer from "multer"

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: ( req, file, cb ) => cb( null, file.originalname ),
  } ),
} );

export async function GET( request: NextApiRequest ): Promise<Response> {
  return new Response( 'Hello, Next.js!' )
}

// export async function POST(request:NextApiRequest,response: NextApiResponse):Promise<Response>{
//
//   const upload = multer({ dest: 'upload/' })
//   const imageName = req.file.filename
//   const description = req.body.description
//
//   // Save this data to a database probably
//
//   console.log(description, imageName)
//   res.send({description, imageName})
//
//   return new Response('Hello, Next.js!')
//
//
// }