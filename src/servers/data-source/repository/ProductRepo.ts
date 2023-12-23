import { prisma, TPProduct as TYPE } from '@/servers/data-source/prisma/config';
import { TCREATEPRODUCT } from '@/lib/validation/zod/createZod';
import { TUPDATEPRODUCT } from '@/lib/validation/zod/updateZod';

export class ProductRepo {

  public data = prisma.product

  async createOne( data: TCREATEPRODUCT ): Promise<TYPE> {
    return this.data.create( {
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

  async findAll(): Promise<TYPE[]> {
    return this.data.findMany()
  }

  async findOne( id: string ) {
    return this.data.findUnique( { where: { id } } )
  }

  async deleteOne( id: string ): Promise<TYPE> {
    return this.data.delete( { where: { id } } )
  }

  async updateOne( data: TUPDATEPRODUCT, id: string, ): Promise<TYPE> {
    return this.data.update( { data: { ...data }, where: { id: id } } )
  }
}