// getAll data from database

import { prisma }          from '@/server/models/prisma/config';
import { Prisma, produk, } from '../../../prisma/prisma/data';
import { zProdukType }     from '@/server/service/produk';
import { GetResult }       from '@prisma/client/runtime/library';

type TYPE = zProdukType

type data =
  GetResult<{
    id: string;
    nama: string;
    lokasi: string;
    jenis: string;
    img: string;
    harga: number | null;
    jumlah: number | null;
    keterangan: string;
    created_at: Date;
    updated_at: Date;
  }, any> & {}
  | null

// interface IRepoProduk {
//   // findAll(): Promise<produk[]>
//   // findById( id: string ):
//   // Promise<data> paginate( data: {
//   // row: number, skip: number } ):
//   // Promise<data[]> create( data: TYPE
//   // ): Promise<data> update( data:
//   // TYPE, id: { id: string } ):
//   // Promise<Prisma.BatchPayload>
//   // destroy( id: string ):
//   // Promise<Prisma.BatchPayload>
// }

interface InterfaceProduk {
  findAll(): Promise<produk[]>;
  findById( id: string ): Promise<any>;
  paginate( data: { row: number, skip: number } ): Promise<any>;
  create( data: TYPE ): Promise<any>;
  update( data: TYPE, id: { id: string } ): Promise<any>;
  destroy( id: string ): Promise<Prisma.BatchPayload>;
}

export default class RepoProduk implements InterfaceProduk {
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
  async create( data: TYPE ) {
    return await prisma.produk.create( { data } )
  }

//edit data from database
  async update( data: TYPE, id: { id: string } ) {
    return prisma.produk.updateMany( { where: id, data } )
  }

//delete data from database
  async destroy( id: string ): Promise<Prisma.BatchPayload> {
    return prisma.produk.deleteMany( { where: { id } } )
  }

}

