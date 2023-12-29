import { IBankData } from '@/servers/data-source/interface/prisma/Bank';
import { AbstractPrisma } from '@/servers/data-source/prisma/AbstractPrisma';
import { TPBank } from '@/interface/prisma';

type TYPE = TPBank;

export default class BankData extends AbstractPrisma<"bank"> implements IBankData<TYPE> {

  setOne( d: TYPE ): TYPE {
    return {
      id        : d.id,
      jenis     : d.jenis,
      lokasi    : d.lokasi,
      keterangan: d.keterangan,
      nama      : d.nama,
      no        : d.no,
      hp : d.hp,
      img: d.img || "https://dummyimage.com/200x200/000/fff.jpg&text=not+found",
    }
  }

  setMany( data: TYPE[] ) {
    return data.map( ( d ) => ( this.setOne( d ) ) )
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


