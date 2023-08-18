import { prisma } from '@/server/models/prisma/config';
import { Prisma, } from '../../../../prisma/data';

export type TYPE = Prisma.SemuaProductUncheckedCreateInput

export default class AccessTravel {
  async findOne( id: string ) {
    return prisma.semuaProduct.findUnique( {
      where: { id: id },
    } )
  }

  async findAlls( data: TYPE ) {
    return prisma.semuaProduct.findMany( {
      take   : 400,
      orderBy: { nama: "asc" }
    } )
  }

  async Paginate( skip: number = 1, take: number = 100, add: number = 0 ) {
    add        = take + add
    const page = skip * take
    return prisma.semuaProduct.findMany( {
      skip   : page,
      take   : add,
      orderBy: { nama: "asc" }
    } )
  }

  async CreateOne( data: TYPE ) {
    return prisma.semuaProduct.create( {
      data: this.setData( data )
    } )
  }

  async UpdateOne( id: string, data: TYPE ) {
    return prisma.semuaProduct.update( {
      where: { id },
      data : this.setData( data )

    } )
  }

  async UpdateMany( id: string, data: TYPE ) {
    return prisma.semuaProduct.updateMany( {
      where: { id },
      data : this.setData( data )

    } )
  }

  async DeleteOne( id: string ) {
    return prisma.semuaProduct.delete( {
      where: { id: id }
    } )
  }

  async DeleteMany( id: string ) {
    return prisma.semuaProduct.deleteMany( {
      where: { id: id }
    } )
  }

  setData( data: TYPE ) {
    return {
      harga     : data.harga,
      id        : data.id,
      img: data.img || "no image",
      jenis     : data.jenis,
      keterangan: data.keterangan,
      lokasi    : data.lokasi,
      jumlah    : data.jumlah,
      nama      : data.nama,
      orderanId : data.id + Date.now().toString()
    }
  }

}


