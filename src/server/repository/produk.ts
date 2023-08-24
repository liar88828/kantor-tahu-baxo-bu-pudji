import { prisma } from '@/server/models/prisma/config';
import type { TYPE } from '@/server/models/dataAccess/Produk';
import { Prisma } from '../../../prisma/data';
import { InterfaceProduk } from '@/server/repository/interface/repository/produk';

export default class RepoProduk implements InterfaceProduk {
  setOne( d: TYPE ): TYPE {
    return {
      id        : d.id,
      nama      : d.nama,
      jenis : d.jenis.replaceAll( " ", "" ),
      lokasi: d.lokasi.replaceAll( " ", "" ),
      harga     : d.harga || 0,
      keterangan: d.keterangan,
      jumlah    : d.jumlah || 0,
      img       : d.img || "tidak ada",
    }
  }

  setMany( data: TYPE[] ) {
    return data.map( ( d ) => ( this.setOne( d ) ) )
  }

  async findAll() {
    return prisma.produk.findMany( {
      select: {
        id        : true,
        nama      : true,
        lokasi    : true,
        jenis     : true,
        harga     : true,
        keterangan: true,
      }
    } )
  }

  async findById( id: string ) {
    return prisma.produk.findUnique( { where: { id } } )
  }

  async findOne( id: string ) {
    return prisma.produk.findFirst( { where: { id } } )
  }

  async paginate( data: { row: number, skip: number } ) {
    const { row, skip } = data
    return prisma.produk.findMany( { take: row, skip } )
  }

  async createOne( data: TYPE ) {
    return prisma.produk.create( { data: this.setOne( data ) } );
  }

  async createMany( data: TYPE[] ) {
    return prisma.produk.createMany( {
      data: this.setMany( data )
    } );
  }

  async updateOne( data: TYPE, id: string ) {
    return prisma.produk.update( {
      where: { id: id }, data: this.setOne( data )
    } )
  }

  async updateMany( data: TYPE[], id: string ) {
    return prisma.produk.updateMany( {
      where: { id: id },
      data : this.setMany( data )
    } )
  }

  async destroyOne( id: string ) {
    return prisma.produk.delete( { where: { id } } )
  }

  async destroyMany( id: string ): Promise<Prisma.BatchPayload> {
    return prisma.produk.deleteMany( { where: { id } } )
  }

}

