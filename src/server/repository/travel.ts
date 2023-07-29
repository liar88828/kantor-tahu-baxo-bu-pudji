import { prisma }    from '@/server/models/prisma/config';
import type { TYPE } from '@/server/models/dataAccess/Travel';
import {
  InterfaceRepoTravel
}                    from '@/server/repository/interface/repository/travel';

// getAll data from database
export default class RepoTravel implements InterfaceRepoTravel {
  setData( d: TYPE ) {
    return {
      id            : d.id,
      jenis         : d.jenis,
      harga         : d.harga,
      lokasi        : d.lokasi,
      keterangan    : d.keterangan,
      namaPengiriman: d.namaPengiriman,
      noHpPerusahaan: d.noHpPerusahaan,
      img           : d.img || "noting",
    }
  }

  async findAll() {
    return prisma.travel.findMany()

  }

//get only one  data from database
  async findById( id: string ) {

    return prisma.travel.findUnique( { where: { id } } )

  }

//get per page data from database
  async paginate( data: { row: number, skip: number } ) {
    const { row, skip } = data
    return prisma.travel.findMany( { take: row, skip } )
  }

//create data from database
  async create( data: TYPE ) {
    return prisma.travel.create( { data: this.setData( data ) } )
  }

//edit data from database
  async update( data: TYPE, id: string ) {
    return prisma.travel.updateMany( {
      where: { id: id }, data: this.setData( data )
    } )
  }

//delete data from database
  async destroy( id: string ) {
    return prisma.travel.deleteMany( { where: { id } } )
  }

}
