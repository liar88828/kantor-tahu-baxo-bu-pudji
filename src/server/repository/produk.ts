import { prisma }    from '@/server/models/prisma/config';
import type { TYPE } from '@/server/models/dataAccess/Produk';
import { Prisma }    from '../../../prisma/data';
import {
  InterfaceProduk
}                    from '@/server/repository/interface/repository/produk';

export default class RepoProduk implements InterfaceProduk {

  setOne( d: TYPE ): TYPE {
    return {
      id        : d.id,
      nama      : d.nama,
      jenis     : d.jenis,
      lokasi: d.lokasi,
      harga     : d.harga || 0,
      keterangan: d.keterangan,
      jumlah    : d.jumlah || 0,
      img       : d.img || "tidak ada",
    }
  }

  setMany( data: TYPE[] ): TYPE[] {
    return data.map( ( d ) => ( this.setOne( d ) ) )
  }

  async findAll() {
    return prisma.produk.findMany()
  }

//get only one  data from database
  async findById( id: string ) {
    return prisma.produk.findUnique( { where: { id } } )
  }

//get only one  data from database
  async findOne( id: string ) {
    return prisma.produk.findFirst( { where: { id } } )
  }

//get per page data from database
  async paginate( data: { row: number, skip: number } ) {
    const { row, skip } = data
    return prisma.produk.findMany( { take: row, skip } )
  }

//create data from database
  async createOne( data: TYPE ) {
    return prisma.produk.create( { data: this.setOne( data ) } );
  }

//create data from database
  async createMany( data: TYPE[] ) {
    return prisma.produk.createMany( {
      data: this.setMany( data )
    } );
  }

//edit data from database
  async updateOne( data: TYPE, id: string ) {
    return prisma.produk.update( {
      where: { id: id }, data: this.setOne( data )
    } )
  }

//edit data from database
  async updateMany( data: TYPE[], id: string ) {
    return prisma.produk.updateMany( {
      where: { id: id },
      data : this.setMany( data )
    } )
  }

//delete data from database
  async destroyOne( id: string ) {
    return prisma.produk.delete( { where: { id } } )
  }

  async destroyMany( id: string ): Promise<Prisma.BatchPayload> {
    return prisma.produk.deleteMany( { where: { id } } )
  }

}

