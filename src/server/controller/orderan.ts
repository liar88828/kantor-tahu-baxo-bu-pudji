import { NextApiResponse } from 'next';
import Service             from '@/server/service/produk';
import { notValid }        from '@/server/exeption/notValid';

const get = ( body: any, res: NextApiResponse ) => {
}

const create = async ( res ) => {

  const serData = Service.create( res )
  const valid   = notValid( serData )

}
const edit   = ( body: any ) => {

  return
}
const destroy = ( body: any ) => {

  return
}

export { get, post, edit, destroy }