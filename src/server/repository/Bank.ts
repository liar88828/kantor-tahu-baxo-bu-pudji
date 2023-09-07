import type { TYPE } from '@/server/models/dataAccess/Bank';
import { Repository } from '@/server/repository/Abstract';
import { IBankRepository } from '@/interface/repository/Bank';

export class BankRepository extends Repository<"bank"> implements IBankRepository<TYPE> {

  setOne( d: TYPE ): TYPE {
    return {
      id        : d.id,
      jenis     : d.jenis,
      lokasi    : d.lokasi,
      keterangan: d.keterangan,
      nama      : d.nama,
      no        : d.no,
      hp : d.hp,
      img: d.img
    }
  }
  setMany( data: TYPE[] ) {
    return data.map( ( d ) => ( this.setOne( d ) ) )
  }

//get per page data from database
  async paginate( data: {
    row: number,
    skip: number
  } ) {
    const { row, skip } = data
    return this.prisma.findMany( { take: row, skip } )
  }

//delete data from database
  async destroy( id: string ) {
    return this.prisma.deleteMany( { where: { id } } )
  }

  async createMany( data: TYPE[] ) {
    return this.prisma.createMany( {
      data: this.setMany( data )
    } );
  }

  async destroyMany( id: string ) {
    return this.prisma.deleteMany( { where: { id } } )
  }

  async updateMany( data: TYPE[], id: string ) {
    return this.prisma.updateMany( {
      where: { id: id },
      data : this.setMany( data )
    } )
  }

}


