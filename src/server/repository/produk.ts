// getAll data from database

import { prisma } from '@/server/models/prisma/config';
import { TPProduk } from '@/server/repository/interface/prisma';
import { Prisma, produk, } from '../../../prisma/prisma/data';
import { zProdukType } from '@/server/service/produk';

type TYPE = TPProduk

interface IRepoProduk {
  update( data: produk, id: { id: string } ): Promise<Prisma.BatchPayload>
  findAll(): Promise<produk[]>
  // findById(): Promise<produk>
}

class RepoProduk implements IRepoProduk {
  async findAll(): Promise<produk[]> {
    return await prisma.produk.findMany()
  }

//get only one  data from database
  async findById( id: string ) {
    return await prisma.produk.findUnique( { where: { id } } )
  }

//get per page data from database
  async paginate( data: { row: number, skip: number } ) {
    const { row, skip } = data
    return prisma.produk.findMany( { take: row, skip } )
  }

//create data from database
  async create( data: zProdukType ) {
    console.log( "success" )
    return await prisma.produk.create( { data } )
  }

//edit data from database
  async update( data: produk, id: { id: string } ) {
    return prisma.produk.updateMany( { where: id, data } )
  }

//delete data from database
  async destroy( id: string ) {
    return prisma.produk.deleteMany( { where: { id } } )
  }

}

const { findAll, create, destroy, paginate, findById, update } = new RepoProduk
const Repo = { findAll, create, destroy, paginate, findById, update }
export default Repo
