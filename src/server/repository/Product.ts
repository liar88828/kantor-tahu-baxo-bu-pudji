import { prisma, TPProduct } from '@/server/models/prisma/config';
import { IRepoProduct } from '@/interface/repository/Product';
import { ARepository } from '@/server/repository/ARepository';

type TYPE = TPProduct;
export default class RepoProduk extends ARepository<"product"> implements IRepoProduct<TYPE> {
  findDashboard(): Promise<any> {
    throw new Error( 'Method not implemented.' );
  }
  destroyMany(): Promise<any> {
    throw new Error( 'Method not implemented.' );
  }
  setOne( d: TYPE ): TYPE {
    return {
      id        : d.id,
      nama      : d.nama,
      jenis     : d.jenis.replaceAll( " ", "" ),
      lokasi    : d.lokasi.replaceAll( " ", "" ),
      harga     : d.harga || 0,
      keterangan: d.keterangan,
      jumlah    : d.jumlah || 0,
      img       : d.img || "https://dummyimage.com/200x200/000/fff.jpg&text=not+found",
    }
  }

  setMany( data: TYPE[] ): any[] {
    return data.map( ( d ) => ( this.setOne( d ) ) )
  }

  async updateMany( data: TYPE[], id: string ) {
    return prisma.product.updateMany( {
      where: { id: id },
      data : this.setMany( data )
    } )
  }
}

