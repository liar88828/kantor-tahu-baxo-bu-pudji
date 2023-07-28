import { prisma }    from '@/server/models/prisma/config';
import type { TYPE } from '@/server/models/dataAccess/Produk';
import { Prisma }    from '../../../prisma/data';

interface InterfaceProduk {
  findAll(): Promise<TYPE[]>;
  findById( id: string ): Promise<any>;
  paginate( data: { row: number, skip: number } ): Promise<any>;
  create( data: TYPE ): Promise<any>;
  update( data: TYPE, id: { id: string } ): Promise<any>;
  destroy( id: string ): Promise<Prisma.BatchPayload>;
}

export default class RepoProduk implements InterfaceProduk {
  setData( d: TYPE ) {
    return {
      id        : d.id,
      nama      : d.nama,
      lokasi    : d.lokasi,
      jenis     : d.jenis,
      harga     : d.harga || 0,
      jumlah    : d.jumlah || 0,
      img       : d.img || "tidak ada",
      keterangan: d.keterangan,
    }
  }

  async findAll() {
    return await prisma.produk.findMany()
  }

//get only one  data from database
  async findById( id: string ) {
    return await prisma.produk.findUnique( { where: { id } } )
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
  async update( data: TYPE, id: { id: string } ) {
    return prisma.produk.updateMany( { where: id, data: this.setData( data ) } )
  }

//delete data from database
  async destroy( id: string ): Promise<Prisma.BatchPayload> {
    return prisma.produk.deleteMany( { where: { id } } )
  }

}

// interface IRepoProduk {
//   // findAll(): Promise<produk[]>
//   // findById( id: string ):
//   // Promise<data> paginate( data: {
//   // row: number, skip: number } ):
//   // Promise<data[]> create( data: TYPE
//   // ): Promise<data> update( data:
//   // TYPE, id: { id: string } ):
//   // Promise<Prisma.BatchPayload>
//   // destroy( id: string ):
//   // Promise<Prisma.BatchPayload>
// }
