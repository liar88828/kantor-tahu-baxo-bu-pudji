import { prisma }    from '@/server/models/prisma/config';
import type { TYPE } from '@/server/models/dataAccess/Produk';
import { Prisma } from '../../../prisma/data';
import {
  InterfaceProduk
} from '@/server/repository/interface/repository/produk';



export default class RepoProduk implements InterfaceProduk {
  setData( d: TYPE ) {
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

  async findAll() {
    return prisma.produk.findMany()
  }

//get only one  data from database
  async findById( id: string ) {
    return prisma.produk.findUnique( { where: { id } } )
  }

//get per page data from database
  async paginate( data: { row: number, skip: number } ) {
    const { row, skip } = data
    return prisma.produk.findMany( { take: row, skip } )
  }

//create data from database
  async create( data: TYPE ) {
    return prisma.produk.create( { data: this.setData( data ) } );
  }

//edit data from database
  async update( data: TYPE, id: string ) {
    return prisma.produk.updateMany( {
      where: { id: id }, data: this.setData( data )
    } )
  }

//delete data from database
  async destroy( id: string ): Promise<Prisma.BatchPayload> {
    return prisma.produk.deleteMany( { where: { id } } )
  }

}

