import Validation                    from '@/lib/validation/schema';
import Service                       from '@/server/service/orderan';
import RepoOrderan                   from '@/server/repository/orderan';
import type { TOrderServer as TYPE } from '@/entity/server/orderan';

const Repo  = new RepoOrderan()
const valid = new Validation()

const find = async () => {
  const repo = await Repo.findAll()
  // console.log( "test Travel find" )
  return repo
}

const findById = async ( id: string ) => {
  const service = Service.findById( valid.ZFindById( id ), id )
  const repo    = await Repo.findById( service )
  return repo
}

const create = async ( body: TYPE ) => {
  // console.log( "test1" )
  body       = Service.create( valid.Input( body, valid.OrderanSchema ), body )
  // console.log( "test 2" )
  const repo = await Repo.createNesting( body )
  // const repo = await Repo.createTransaction( body )
  // console.log( repo )
  return repo
}

const edit = async ( body: TYPE, id: string ) => {
  id   = Service.findById( valid.ZFindById( id ), id )
  body = Service.create( valid.Input( body, valid.OrderanSchema ), body )

  // const repo = await Repo.updateOne( body, id )
  const repo = await Repo.UpdateMany( id, body )

  return repo
}

const destroy = async ( id: string ) => {
  id         = Service.findById( await valid.ZFindById( id ), id )
  // console.log(id)
  const repo = await Repo.destroyOne( id )
  return repo
}

const Control = { find, create, edit, destroy, findById }
export default Control