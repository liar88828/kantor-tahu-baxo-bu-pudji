import Validation from '@/lib/validation/schema';
import Service from '@/lib/validation/validation';
import Orderan from '@/server/repository/Orderan';
import { TOptional } from '@/entity/server/types';
import type { TOrderServer as TYPE } from '@/entity/server/orderan';
import { prisma } from '@/server/models/prisma/config';
import { TStatusParams } from '@/interface/repository/SemuaProduk';

const Repo = new Orderan()
const valid = new Validation()

const find = async () => {
  return Repo.findAll()
}

const findDashboard = async () => {
  return Repo.findDashboard()
}

const status = async ( data: TStatusParams ) => {
  return prisma.orderan.update( {
    where: { id: data.id },
    data : { status: data.status }
  } );
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
  body = Service.create( valid.Input( body, valid.OrderanSchema ), body )
  // console.log( validData )
  if( body.namaPengiriman ) {
    return await Repo.createOne( body )
  }
  return body
}

const edit = async ( body: TYPE, id: string ) => {
  id   = Service.findById( valid.ZFindById( id ), id )
  body = Service.create<TYPE>( valid.Input( body, valid.OrderanSchema ), body )
  if( body.namaPengiriman ) {
    const data = await Repo.updateMany( body, id )
    return data
  }
  return body
}

const updateOneOnly = async ( id: string, option: string, value: Partial<TOptional> ) => {
  return {}
}

const destroy = async ( id: string ) => {
  id = Service.findById( valid.ZFindById( id ), id )
  return await Repo.destroyOne( id )
}

const deleteMany = async ( body: string[] ) => {
  const validData = Service.create<string[]>( valid.Input( body, valid.ZIdMany ), body )
  if( typeof validData === 'object' ) {
    return Repo.destroyMany( validData )
  }
  return validData
}

const Control = { findDashboard, find, create, edit, destroy, findOne, findByStatus, deleteMany, updateOneOnly, status }
export default Control