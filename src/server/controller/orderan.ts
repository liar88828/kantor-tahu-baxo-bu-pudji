import Validation from '@/lib/validation/schema';
import Service from '@/server/service/orderan';
import RepoOrderan from '@/server/repository/orderan';
import type { TOrderServer as TYPE } from '@/entity/server/orderan';
import { TOptional } from '@/entity/server/types';

const Repo  = new RepoOrderan()
const valid = new Validation()

const find = async () => {
  return Repo.findAll()
}

const findOne = async ( id: string ) => {
  id = Service.findById( valid.ZFindById( id ), id )
  return Repo.findOne( id )
}

const findByStatus = async ( status: string ) => {
  const service = Service.findById( valid.ZFindById( status ), status )
  return Repo.findById( service )
}

const create = async ( body: TYPE ) => {
  const validData = await Service.create( await valid.Input( body, valid.OrderanSchema ), body )
  // console.log( validData  )
  if( typeof validData === "object" ) {
    return await Repo.createOne( validData )
  }
  return validData
}

const edit = async ( body: TYPE, id: string ) => {
  id              = Service.findById( valid.ZFindById( id ), id )
  const validData = await Service.create( await valid.Input( body, valid.OrderanSchema ), body )
  // console.log( id )
  // console.log( body.id.length )
  // console.log( validData )
  if( typeof validData === 'object' ) {
    const data = await Repo.updateMany( validData, id )
    console.log( data )
    return data
  }
  return validData
}

const updateOneOnly = async ( id: string, option: string, value: Partial<TOptional> ) => {
  return {}
}

const destroy = async ( id: string ) => {
  id = Service.findById( valid.ZFindById( id ), id )
  return await Repo.destroyOne( id )
}

const deleteMany = async ( body: any ) => {
  const validData = await Service.create( await valid.Input( body, valid.ZIdMany ), body )
  if( typeof validData === 'object' ) {
    return Repo.destroyMany( validData )
  }
  return validData
}

const Control = { find, create, edit, destroy, findOne, findByStatus, deleteMany, updateOneOnly }
export default Control