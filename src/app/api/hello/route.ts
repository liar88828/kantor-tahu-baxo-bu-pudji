import { NextApiRequest } from 'next';

export async function GET(request: NextApiRequest):Promise<Response> {
  return new Response('Hello, Next.js!')
}
