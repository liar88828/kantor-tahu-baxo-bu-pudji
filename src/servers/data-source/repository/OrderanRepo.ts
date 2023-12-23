import { prisma, TPOrderan } from '@/servers/data-source/prisma/config';
import { TUPDATEORDERAN } from '@/lib/validation/zod/updateZod';
import { TCREATEORDERAN } from '@/lib/validation/zod/createZod';
import { Prisma } from '../../../../prisma/data';
import { TStatusParams } from '@/servers/data-source/interface/prisma/SemuaProduk';
import OrderanCreateInput = Prisma.OrderanCreateInput;

type TYPE = TPOrderan

export class OrderanRepo {
  public data = prisma.orderan

  async createOne( data: TCREATEORDERAN ) {
    const one = prisma.orderan.create( {
      data: this.setOne( data )
    } )

    const many = prisma.semuaProduct.createMany( {
      data: this.setMany( data, "POST" )
    } )
    return prisma.$transaction( [ one, many ] )

  }
  async findAll() {
    return this.data.findMany( {
      orderBy: { created_at: "desc" }, take: 100
    } )
  }
  async findOne( id: string ) {
    return this.data.findUnique( { where: { id } } )
  }
  async findByStatus( status: TYPE["status"] ) {
    let option = {
      include: { semuaProduct: true }
    }

    if( status !== "Semua" ) {
      option = Object.assign( option, {
        where  : { status },
        orderBy: { created_at: "desc" },
        take   : 100
      } )
    }

    return prisma.orderan.findMany( option )
  }
  async updateOne( data: TUPDATEORDERAN, id: string, ) {
    const updateData = prisma.orderan.update( {
      where: { id },
      data : this.setOne( data )
    } );

    const createMany = prisma.semuaProduct.createMany( {
      data: this.setMany( data, "POST" )
    } )

    const deleteProduct = prisma.semuaProduct.deleteMany( { where: { orderanId: id } } )
    return prisma.$transaction( [ deleteProduct, createMany, updateData ] )

  }
  async updateStatus( data: TStatusParams, id: string, ) {
    // console.log(data)
    return prisma.orderan.update( {
      where: { id: id },
      data : { status: data.status }
    } )
  }
  async deleteOne( id: string ) {
    return this.data.delete( { where: { id } } )
  }
  async destroyMany( array: string [] ) {
    const id          = array.map( d => d )
    const deleteOrder = prisma.orderan.deleteMany( { where: { id: { in: id } } } )

    const deleteProduct = prisma.semuaProduct.deleteMany( { where: { orderanId: { in: id } } } )

    return prisma.$transaction( [ deleteProduct, deleteOrder ] )
  }
  private setOne( d: Omit<OrderanCreateInput, "semuaProduct"> ) {
    // d.waktuKirim = !d.waktuKirim ? new Date() : d.waktuKirim
    // d.pesan      = !d.pesan ? new Date() : d.pesan
    // d.kirim      = !d.kirim ? new Date() : d.kirim

    const time = ( d.waktuKirim.toString().length === 5 )
                 ? d.waktuKirim + ":00"
                 : d.waktuKirim
    // console.log(new Date( d.pesan ),)
    return {
      alamatPenerima: d.alamatPenerima,
      guna          : d.guna,
      dari          : d.dari,
      hpPenerima    : d.hpPenerima,
      hpPengirim    : d.hpPengirim,
      id            : d.id ?? '',
      lokasi        : d.lokasi.replaceAll( " ", "" ),
      namaPengiriman: d.namaPengiriman,
      ongkir        : d.ongkir,
      penerima      : d.penerima,
      pengirim      : d.pengirim,
      pesan         : new Date( d.pesan ),
      waktuKirim    : new Date( d.waktuKirim ),
      // waktuKirim    : new Date( d.kirim + "T" + time + ".000Z" ),
      status        : d.status,
      totalBayar    : d.totalBayar,
      totalPenjualan: d.totalPenjualan,
      typePembayaran: d.typePembayaran,
    }
  }
  private setMany( data: TYPE, method: "POST" | "PUT" ) {
    return data.semuaProduct.map( ( d: TProOrderan ) => (
        Object.assign( {
          harga     : d.harga,
          id        : method === "PUT" ? d.id : d.id + "_" + Date.now(),
          jenis     : d.jenis.replaceAll( " ", "" ),
          jumlah    : d.jumlah,
          keterangan: d.keterangan,
          lokasi    : d.lokasi.replaceAll( " ", "" ),
          img       : d.img,
          nama      : d.nama,
          orderanId : data.id
        } )
      )
    );
  }
}