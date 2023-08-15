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
  // console.log( body )
  const validData = await Service.create( await valid.Input( body, valid.OrderanSchema ), body )
  if( typeof validData === "object" ) {
    return await Repo.createNesting( validData )
  }
  return validData
}

const edit = async ( body: TYPE, id: string ) => {
  id              = Service.findById( valid.ZFindById( id ), id )
  const validData = await Service.create( await valid.Input( body, valid.OrderanSchema ), body )

  if( typeof validData === 'object' ) {
    return Repo.UpdateMany( id, validData )
  }
  return validData
}

const updateOneOnly = async ( id: string, option: string, value: Partial<TOptional> ) => {
  id         = Service.findById( valid.ZFindById( id ), id )
  const repo = await Repo.updateOneOnly( id, value )

}
const destroy       = async ( id: string ) => {
  id = Service.findById( valid.ZFindById( id ), id )
  const repo = await Repo.destroyOne( id )
  return repo
}

const deleteMany = async ( body: any ) => {
  const validData = await Service.create( await valid.Input( body, valid.ZIdMany ), body )
  // console.log(validData)
  if( typeof validData === 'object' ) {
    const data = Repo.deleteMany( body )
  }

  // console.log(typeof validData);
  return validData
}

const Control = { find, create, edit, destroy, findById, updateOneOnly, findByStatus, deleteMany }
export default Control