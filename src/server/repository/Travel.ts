import { prisma } from '@/server/models/prisma/config';
import type { TYPE } from '@/server/models/dataAccess/Travel';
import { InterfaceRepoTravel } from '@/interface/repository/travel';

// getAll data from database
export default class RepoTravel implements InterfaceRepoTravel {
  setOne( d: TYPE ): TYPE {
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

  setMany( data: TYPE[] ) {
    return data.map( ( d ) => ( this.setOne( d ) ) )
  }

  async findAll() {
    return prisma.travel.findMany()

  }

//get only one  data from database
  async findById( id: string ) {
    return prisma.travel.findUnique( { where: { id } } )
  }

//get only one  data from database
  async findOne( id: string ) {
    return prisma.travel.findFirst( { where: { id } } )
  }

//get per page data from database
  async paginate( data: { row: number, skip: number } ) {
    const { row, skip } = data
    return prisma.travel.findMany( { take: row, skip } )
  }

//create data from database
  async createOne( data: TYPE ) {
    return prisma.travel.create( { data: this.setOne( data ) } )
  }

//edit data from database
  async updateOne( data: TYPE, id: string ) {
    return prisma.travel.update( {
      where: { id: id }, data: this.setOne( data )
    } )
  }

//delete data from database
  async destroy( id: string ) {
    return prisma.travel.deleteMany( { where: { id } } )
  }

  async createMany( data: TYPE[] ) {
    return prisma.travel.createMany( {
      data: this.setMany( data )
    } );
  }

  async destroyMany( id: string ) {
    return prisma.travel.deleteMany( { where: { id } } )

  }

  async destroyOne( id: string ) {
    return prisma.travel.delete( { where: { id } } )

  }

  async updateMany( data: TYPE[], id: string ) {
    return prisma.travel.updateMany( {
      where: { id: id },
      data : this.setMany( data )
    } )
  }

}
