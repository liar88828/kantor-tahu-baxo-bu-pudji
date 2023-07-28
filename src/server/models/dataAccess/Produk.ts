import { prisma } from '@/server/models/prisma/config';
import { Prisma } from '../../../../prisma/data';

// interface IOrderanAccess {
//
// }

// type PrismaCreate = Prisma.OrderanUpdateInput | {
//   semuaProduct: Prisma.ProdukFind
// }
export type TYPE = Prisma.produkCreateInput

export default class AccessTravel {

  async findOne( id: string ) {
    return prisma.produk.findUnique( {
      where: { id: id },

    } )
  }

  async findAll( data: Prisma.produkSelectScalar ) {
    return prisma.produk.findMany( {
      take   : 400,
      orderBy: { nama: "asc" }
    } )
  }

  async Paginate( skip: number = 1, take: number = 100, add: number = 0 ) {

    // all in database 1000
    // take =100
    // skip =1

    // take ada 50 row
    add = take + add// ada 50 row

    //  page yang ke 1,2,3
    const page = skip * take
    return prisma.produk.findMany( {
      skip   : page,
      take   : add,
      orderBy: { nama: "asc" }
    } )
  }

  async CreateMany( data: Prisma.produkCreateInput ) {
    return prisma.produk.create( {
      data: this.setData( data )
    } )
  }

  async UpdateMany( id: string, data: Prisma.produkCreateInput ) {

    return prisma.produk.updateMany( {
      where: { id },
      data : this.setData( data )

    } )
  }

  async UpdateOne( id: string, data: Prisma.produkCreateInput ) {
    return prisma.produk.updateMany( {
      where: { id },
      data : this.setData( data )

    } )
  }

  async DeleteOne( id
    :
    string
  ) {
    return prisma.produk.delete( {
      where: { id: id }
    } )
  }

  async DeleteMany( id
    :
    string
  ) {
    return prisma.produk.deleteMany( {
      where: { id: id }
    } )
  }

  setData( data: TYPE ) {
    return {
      harga     : data.harga,
      id        : data.id,
      img       : data.img,
      jenis     : data.jenis,
      keterangan: data.keterangan,
      lokasi    : data.lokasi,
      jumlah    : data.jumlah,
      nama      : data.nama,

    }
  }

}


