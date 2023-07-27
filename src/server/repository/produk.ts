// getAll data from database

import { prisma } from '@/server/models/prisma/config';
import { TPProduk } from '@/server/repository/interface/prisma';

type TYPE = TPProduk
const findAll = async () => {
  return prisma.produk.findMany()
}

//get only one  data from database
const findById = async ( id: string ) => {
  return prisma.produk.findUnique( { where: { id } } )
}

//get per page data from database
const paginate = async ( data: { row: number, skip: number } ) => {
  const { row, skip } = data
  return prisma.produk.findMany( { take: row, skip } )
}

//create data from database
const create = async ( data: TYPE ) => {
  return prisma.produk.create( { data: data } )
}

//edit data from database
const update = async ( data: TYPE, id: { id: string } ) => {
  return prisma.produk.updateMany( { where: id, data: data } )
}

//delete data from database
const destroy = async ( id: string ) => {
  return prisma.produk.deleteMany( { where: { id } } )
}

const Repo = { findAll, create, destroy, paginate, findById, update }
export default Repo