import prisma from '@/servers/data-source/prisma/config';
import { TCREATEPRODUCT } from '@/lib/validation/zod/createZod';
import { TUPDATEPRODUCT } from '@/lib/validation/zod/updateZod';
import { TPProduct } from '@/interface/prisma';

export class ProductRepo {

  static async findPaginate( page: number, take: number ) {
    return prisma.product.findMany( { take: take, skip: ( page - 1 ) * take } )
  }
  async createOne( data: TCREATEPRODUCT ): Promise<TPProduct> {
    return prisma.product.create( {
      data: {

        id        : data.id,
        harga     : data.harga,
        img       : data.img,
        jenis     : data.jenis,
        jumlah    : data.jumlah,
        keterangan: data.keterangan,
        lokasi    : data.lokasi,
        nama      : data.nama,

      }
    } )
  }
  async findAll(): Promise<TPProduct[]> {
    return prisma.product.findMany()
  }

  async findOne( id: string ) {
    return prisma.product.findUnique( { where: { id } } )
  }

  async deleteOne( id: string ): Promise<TPProduct> {
    return prisma.product.delete( { where: { id } } )
  }

  async updateOne( data: TUPDATEPRODUCT, id: string, ): Promise<TPProduct> {
    return prisma.product.update( { data: { ...data }, where: { id: id } } )
  }
}