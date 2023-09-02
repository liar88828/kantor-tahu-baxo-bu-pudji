import type { TYPE } from '@/server/models/dataAccess/Bank';
import { AbstractRepository } from '@/server/repository/AbstractRepository';
import { InterfaceBankRepository } from '@/server/repository/interface/repository/bank';

export class BankRepository extends AbstractRepository<"bank"> implements InterfaceBankRepository {

  setOne( d: TYPE ): TYPE {
    return {
      id        : d.id,
      jenis     : d.jenis,
      lokasi    : d.lokasi,
      keterangan: d.keterangan,
      nama      : d.nama,
      no        : d.no,
      hp        : d.hp
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


