import Validation from '@/lib/validation/schema';
import Service from '@/server/service/orderan';
import RepoOrderan from '@/server/repository/orderan';
import type { TOrderServer as TYPE } from '@/entity/server/orderan';
import { TOptional } from '@/entity/server/types';

const Repo  = new RepoOrderan()
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

const findByStatus = async ( status: string ) => {
  const service = Service.findById( valid.ZFindById( status ), status )
  const repo    = await Repo.findByStatus( service )
  return repo
}

const create = async ( body: TYPE ) => {
  body       = Service.create( valid.Input( body, valid.OrderanSchema ), body )
  const repo = await Repo.createNesting( body )
  return repo
}

const edit = async ( body: TYPE, id: string ) => {
  id   = Service.findById( valid.ZFindById( id ), id )
  body = Service.create( valid.Input( body, valid.OrderanSchema ), body )
  const repo = await Repo.UpdateMany( id, body )

  return repo
}

const destroy       = async ( id: string ) => {
  id         = Service.findById( await valid.ZFindById( id ), id )
  // console.log(id)
  const repo = await Repo.destroyOne( id )
  return repo
}
const updateOneOnly = async ( id: string, option: string, value: Partial<TOptional> ) => {
  id         = Service.findById( await valid.ZFindById( id ), id )
  const repo = await Repo.updateOneOnly( id, value )

}
const Control       = { find, create, edit, destroy, findById, updateOneOnly, findByStatus, }
export default Control