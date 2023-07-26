import { insert } from '@/server/repository/orderan';
import { TOrder } from '@/entity/orderan';
import { validate } from '@/server/service/orderan';
import { TOrderSuccess, TOrderValid } from '@/entity/server/orderan';
import { NextApiResponse } from 'next';
import { notSuccess } from '@/server/exeption/notSuccess';
import { notValid } from '@/server/exeption/notValid';

const get = ( body: any, res: NextApiResponse ) => {
}

const post = async ( dataOrder: TOrder["orang"], res: NextApiResponse ) => {
  if( !dataOrder ) throw new Error( "Data is not valid " )
  //valid
  const validOrder: TOrderValid = await validate( dataOrder )
  const validException = notValid( res, validOrder )
  //success
  const repoOrder: TOrderSuccess = await insert( validException )
  const successException = notSuccess( res, repoOrder )
  //send back success
  return successException
}
const edit = ( body: any ) => {

  return
}
const destroy = ( body: any ) => {

  return
}

export { get, post, edit, destroy }