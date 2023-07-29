import RepoProduk    from '@/server/repository/produk';
import Validation    from '@/lib/validation/schema';
import type { TYPE } from '@/server/models/dataAccess/Produk';
import Service       from '@/server/service/produk';

const Repo  = new RepoProduk()
const valid = new Validation()

const find = async () => {
  const repo = await Repo.findAll()
  return repo
}

const findById = async ( id: string ) => {
  const service = Service.findById( valid.ZFindById( id ), id )
  const repo    = await Repo.findById( service )
  return repo
}

const create = async ( body: TYPE ) => {
  body       = Service.create( valid.Input( body, valid.ProdukSchema ), body )
  const repo = await Repo.createOne( body )
  return repo
}

const edit = async ( body: TYPE, id: string ) => {
  id   = await Service.findById( valid.ZFindById( id ), id )
  body = await Service.create( valid.Input( body, valid.ProdukSchema ), body )
  const repo = await Repo.updateOne( body, id )
  // console.log( repo )
  return repo
}

const destroy = async ( id: string ) => {
  id         = Service.findById( valid.ZFindById( id ), id )
  const repo = await Repo.destroyOne( id )
  // console.log( repo )
  return repo
}

const Control = { find, create, edit, destroy, findById }
export default Control