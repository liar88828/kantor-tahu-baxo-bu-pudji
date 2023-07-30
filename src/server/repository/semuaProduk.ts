import { prisma }               from '../models/prisma/config';
import { Prisma }               from '../../../prisma/data';
import { InterfaceSemuaProduk } from './interface/repository/semuaProduk';
import type { TYPE }            from '../models/dataAccess/semuaProduk';

export default class RepoSemuaProduk implements InterfaceSemuaProduk {
  setOne( d: TYPE, id: string ): TYPE {
    return {
      harga     : d.harga,
      id        : d.id,
      img       : d.img || "no image",
      jenis     : d.jenis,
      keterangan: d.keterangan,
      lokasi    : d.lokasi,
      jumlah    : d.jumlah,
      nama      : d.nama,
      orderanId : d.orderanId || id
    }
  }

  setMany( data: TYPE[], id: string ): TYPE[] {
    return data.map( ( d: TYPE ) => this.setOne( d, id ) )
  }

  async findAll() {
    return prisma.semuaProduct.findMany( { take: 500 } )
  }

  async findById( id: string ) {
    return prisma.semuaProduct.findUnique( {
      where  : { id },
      include: { Orderan: true }
    } )
  }

  async findOne( id: string ) {
    return prisma.semuaProduct.findFirst( {
      where  : { id },
      include: { Orderan: true }
    } )
  }

  async paginate( data: { row: number, skip: number } ) {
    const { row, skip } = data
    return prisma.semuaProduct.findMany( { take: row, skip } )
  }

  async createOne( data: TYPE, id: string ) {
    return prisma.semuaProduct.create( { data: this.setOne( data, id ) } );
  }

  async createMany( data: TYPE[], id: string ) {
    return prisma.semuaProduct.createMany( {
      data: this.setMany( data, id )
    } );
  }

  async updateOne( data: TYPE, id: string ) {
    return prisma.semuaProduct.update( {
      where: { id: id }, data: this.setOne( data, id )
    } )
  }

  async updateMany( data: TYPE[], id: string ) {
    return prisma.semuaProduct.updateMany( {
      where: { id: id }, data: this.setMany( data, id )
    } )
  }

  async destroyMany( id: string ): Promise<Prisma.BatchPayload> {
    return prisma.semuaProduct.deleteMany( { where: { id } } )
  }

  destroyOne( id: string ): Promise<any> {
    return prisma.semuaProduct.delete( { where: { id } } )
  }
}

