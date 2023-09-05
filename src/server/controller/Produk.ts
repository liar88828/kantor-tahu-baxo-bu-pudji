import RepoProduk from '@/server/repository/Produk';
import Validation from '@/lib/validation/schema';
import { TYPE } from '@/server/models/dataAccess/Produk';
import { fileSystem } from '@/lib/utils/fileSystem';
import Service from '@/lib/validation/validation';

const Repo  = new RepoProduk()
const valid = new Validation()
const s     = Service
const find  = async () => {
  const repo = await Repo.findAll()
  return repo
}

const findById = async ( id: string ) => {
  const service = s.findById( valid.ZFindById( id ), id )
  const repo    = await Repo.findById( service )
  return repo
}

const create = async ( body: TYPE ) => {
  const validData = s.create<TYPE>( valid.Input( body, valid.ProdukSchema ), body )
  if( typeof validData === 'object' ) {
    return Repo.createOne( validData )
  }
  return validData
}

const edit = async ( body: TYPE, id: string ) => {
  id              = s.findById( valid.ZFindById( id ), id )
  const validData = s.create( valid.Input( body, valid.ProdukSchema ), body )

  if( typeof validData === 'object' ) {
    return Repo.updateOne( validData, id, )
  }
  return validData
}

const destroy = async ( id: string ) => {
  id = s.findById( valid.ZFindById( id ), id )
  const repo = await Repo.destroyOne( id )
  console.log( repo )
  await fileSystem( repo.img )
  return repo
}

const Control = { find, create, edit, destroy, findById }
export default Control