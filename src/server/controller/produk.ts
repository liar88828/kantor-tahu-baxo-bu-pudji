import RepoProduk         from '@/server/repository/produk';
import { zProdukType }    from '@/server/service/produk';
import { produk }         from '../../../prisma/data';

type TYPE = zProdukType
const Repo = new RepoProduk()

const find = async (): Promise<produk[]> => {
  return await Repo.findAll()
}

const findById = async ( id: string ) => {
  return Repo.findById( id )
}
const create   = async ( data: TYPE ): Promise<produk> => {

  return await Repo.create( data )
}
const edit     = async ( data: TYPE, id: string ) => {

  const whereInput = { id: id }

  return await Repo.update( data, whereInput )
}

const destroy = async ( id: string ) => {
  return await Repo.destroy( id )
}
const Control = {
  find,
  create,
  edit,
  destroy,
  findById
}

export default Control