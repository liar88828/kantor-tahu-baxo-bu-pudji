import { AbstractPrisma } from '@/servers/data-source/prisma/AbstractPrisma';
import { IProductData } from '@/servers/data-source/interface/prisma/Product';
import { TPProduct } from '@/interface/prisma';
import prisma from '@/servers/data-source/prisma/config';

type TYPE = TPProduct;
export default class ProductData extends AbstractPrisma<"product"> implements IProductData<TYPE> {
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

