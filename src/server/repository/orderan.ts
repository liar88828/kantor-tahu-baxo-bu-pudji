import { prisma } from '@/server/models/prisma/config';
import { Prisma } from '../../../prisma/prisma/data';
import { TOrder } from '@/entity/orderan';
import OrderanCreateInput = Prisma.OrderanCreateInput;

const findAll = () => {
  // getAll data from database
  return prisma.produk.findMany()
}

const findById = ( id: string ) => {
  //get only one  data from database
  return prisma.produk.findUnique( { where: { id } } )
}

const pagenate = ( data: { row: number, skip: number } ) => {
  //get per page data from database
  const { row, skip } = data
  return prisma.produk.findMany( { take: row, skip } )

}

const insert = async ( data: OrderanCreateInput ) => {

  //create data from database
  const sendDatabase = prisma.orderan.create( { data } )

  // const sendDatabase = async ( dataBack: TOrderValid ): Promise<TOrderSuccess> => {
  //   setTimeout( () => 2000 )
  //   return Object.assign( dataBack, { success: true } )
  // }

  // const dataSuccess: TOrderSuccess = await sendDatabase( data )
  return sendDatabase
}
const edit = ( data: TOrder ) => {
  //edit data from database
  data.id = "asdasdas"
  return prisma.produk.updateMany( { where: { id: data.id }, data } )

}

const destroy = ( id: string ) => {
  //delete data from database
  return prisma.produk.delete( { where: { id } } )
}

export { insert, destroy, edit, findAll, findById, pagenate }