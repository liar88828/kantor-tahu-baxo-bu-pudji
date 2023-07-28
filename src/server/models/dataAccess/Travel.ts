import { prisma } from '@/server/models/prisma/config';
import { Prisma } from '../../../../prisma/data';

// interface IOrderanAccess {
//
// }

// type PrismaCreate = Prisma.OrderanUpdateInput | {
//   semuaProduct: Prisma.ProdukFind
// }
export type TYPE = Prisma.travelCreateInput
export default class AccessTravel {

  async findOne( id: string ) {
    return prisma.travel.findUnique( {
      where: { id: id },

    } )
  }

  async findAll( data: Prisma.OrderanSelect ) {
    return prisma.travel.findMany( {
      take   : 400,
      orderBy: { namaPengiriman: "asc" }
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
    return prisma.travel.findMany( {
      skip   : page,
      take   : add,
      orderBy: { namaPengiriman: "asc" }
    } )
  }

  async CreateMany( data: TYPE ) {

    return prisma.travel.create( {
      data: {
        harga         : data.harga,
        id            : data.id,
        img           : data.img,
        jenis         : data.jenis,
        keterangan    : data.keterangan,
        lokasi        : data.lokasi,
        namaPengiriman: data.namaPengiriman,
        noHpPerusahaan: data.noHpPerusahaan
      }
    } )
  }

  async UpdateMany( id: string, data: TYPE ) {

    return prisma.travel.updateMany( {
      where: { id },
      data : {
        harga         : data.harga,
        id            : data.id,
        img           : data.img,
        jenis         : data.jenis,
        keterangan    : data.keterangan,
        lokasi        : data.lokasi,
        namaPengiriman: data.namaPengiriman,
        noHpPerusahaan: data.noHpPerusahaan
      },

    } )
  }

  async UpdateOne( id: string, data: TYPE ) {
    return prisma.travel.updateMany( {
      where: { id },
      data : {
        harga         : data.harga,
        id            : data.id,
        img           : data.img,
        jenis         : data.jenis,
        keterangan    : data.keterangan,
        lokasi        : data.lokasi,
        namaPengiriman: data.namaPengiriman,
        noHpPerusahaan: data.noHpPerusahaan
      },

    } )
  }

  async DeleteOne( id
    :
    string
  ) {
    return prisma.travel.delete( {
      where: { id: id }
    } )
  }

  async DeleteMany( id
    :
    string
  ) {
    return prisma.travel.deleteMany( {
      where: { id: id }
    } )
  }

}



