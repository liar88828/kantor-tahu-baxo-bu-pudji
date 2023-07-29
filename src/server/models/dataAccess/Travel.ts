import { prisma } from '@/server/models/prisma/config';
import { Prisma } from '../../../../prisma/data';

export type TYPE = Prisma.travelCreateInput
export default class AccessTravel {

  async findOne( id: string ) {
    return prisma.travel.findUnique( {
      where: { id: id }
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
      data: this.setData( data ),
    } )
  }

  async UpdateMany( id: string, data: TYPE ) {
    return prisma.travel.updateMany( {
      where: { id },
      data: this.setData( data ),

    } )
  }

  async UpdateOne( id: string, data: TYPE ) {
    return prisma.travel.updateMany( {
      where: { id },
      data: this.setData( data ),
    } )
  }

  async DeleteOne( id: string ) {
    return prisma.travel.delete( {
      where: { id: id }
    } )
  }

  async DeleteMany( id: string ) {
    return prisma.travel.deleteMany( {
      where: { id: id }
    } )
  }

  setData( d: TYPE ) {
    return {
      harga         : d.harga,
      id            : d.id,
      img           : d.img,
      jenis         : d.jenis,
      keterangan    : d.keterangan,
      lokasi        : d.lokasi,
      namaPengiriman: d.namaPengiriman,
      noHpPerusahaan: d.noHpPerusahaan
    }
  }
}