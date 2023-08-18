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
  id         = Service.findById( valid.ZFindById( id ), id )
  const repo = await Repo.findById( id )
  console.log( repo )
  return repo
}

const findByStatus = async ( status: string ) => {
  const service = Service.findById( valid.ZFindById( status ), status )
  const repo    = await Repo.findByStatus( service )
  return repo
}

const create = async ( body: TYPE ) => {
  const validData = await Service.create( await valid.Input( body, valid.OrderanSchema ), body )
  // console.log( validData  )
  if( typeof validData === "object" ) {
    return await Repo.createNesting( validData )
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
    const data = await Repo.UpdateMany( validData, id )
    console.log( data )
    return data
  }
  return validData
}

const updateOneOnly = async ( id: string, option: string, value: Partial<TOptional> ) => {
  // id         = Service.findById( valid.ZFindById( id ), id )
  // const data = {}
  // const repo = await Repo.updateOne( data, id, )
  return {}

}

const destroy = async ( id: string ) => {
  id = Service.findById( valid.ZFindById( id ), id )
  const repo = await Repo.destroyOne( id )
  return repo
}

const deleteMany = async ( body: any ) => {
  const validData = await Service.create( await valid.Input( body, valid.ZIdMany ), body )
  // console.log(body  )
  // console.log(validData)
  if( typeof validData === 'object' ) {
    const data = Repo.deleteMany( body )
  }
  return validData
}

const Control = { find, create, edit, destroy, findById, findByStatus, deleteMany, updateOneOnly }
export default Control