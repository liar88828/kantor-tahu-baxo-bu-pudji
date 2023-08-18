import { prisma, } from '@/server/models/prisma/config';
import { TOrderServer } from '@/entity/server/orderan';
import { TOptional } from '@/entity/server/types';
import { InterfaceOrderan } from '@/server/repository/interface/repository/orderan';
import { TPOrderan } from '@/entity/server/produkOrderan';

export default class RepoOrderan implements InterfaceOrderan {
// getAll data from database
  private getSelect() {
    return {
      id               : true,
      pengirim         : true,
      hpPengirim       : true,
      penerima         : true,
      alamatPenerima   : true,
      hpPenerima       : true,
      pesan            : true,
      kirim            : true,
      waktuKirim       : true,
      guna             : true,
      lokasi           : true,
      namaPengiriman   : true,
      ongkir           : true,
      typePembayaran   : true,
      totalBayar       : true,
      totalPenjualan   : true,
      status           : true,
      semuaHargaProduct: true,
      semuaHargaItem   : true,
      semuaHargaOrderan: true,
      totalHarga       : true,
      semuaProduct     : {
        select: {
          id        : true,
          nama      : true,
          lokasi    : true,
          jenis     : true,
          harga     : true,
          jumlah    : true,
          keterangan: true,
          orderanId : true,
        }
      }
    };
  }

  // ---------CREATE
  async createTransaction( data: TOrderServer ) {
    // console.log( data )
    const createOne = prisma.orderan.create( {
      data: this.setOne( data )
    } )

    const createMany  = prisma.semuaProduct.createMany( {
      data: this.setDataProduct( data )
    } )
    const transaction = await prisma.$transaction( [ createOne, createMany ] )
    // console.log( transaction )
    return transaction
  }

  private setOne( d: Omit<TOrderServer, "semuaProduct"> ) {
    const time = ( d.waktuKirim.toString().length === 5 )
                 ? d.waktuKirim + ":00"
                 : d.waktuKirim
    // console.log(new Date( d.pesan ),)
    return {
      alamatPenerima   : d.alamatPenerima,
      guna             : d.guna,
      hpPenerima       : d.hpPenerima,
      hpPengirim       : d.hpPenerima,
      id               : d.id,
      lokasi           : d.lokasi,
      namaPengiriman   : d.namaPengiriman,
      ongkir           : d.ongkir,
      penerima         : d.penerima,
      pengirim         : d.pengirim,
      pesan            : new Date( d.pesan ),
      kirim            : new Date( d.kirim ),
      waktuKirim       : new Date( d.pesan + "T" + time + ".000Z" ),
      semuaHargaItem   : d.semuaHargaItem,
      semuaHargaOrderan: d.semuaHargaOrderan,
      semuaHargaProduct: d.semuaHargaProduct,
      status           : d.status,
      totalBayar       : d.totalBayar,
      totalHarga       : d.totalHarga,
      totalPenjualan   : d.totalPenjualan,
      typePembayaran   : d.typePembayaran,
    }

  }

  async findAll() {
    return prisma.orderan.findMany( {
      select: this.getSelect(),
      take   : 100,
      orderBy: {
        created_at: "desc"
      },
    } )
  }

  async findById( id: string ) {
    console.log( id )
    const data = await prisma.orderan.findUnique( {
      where  : { id },
      include: { semuaProduct: true }
    } )
    console.log( data )
    return data
  }

  async findByStatus( status: TOrderServer["status"] ) {
    let option = {
      include: { semuaProduct: true }
    }
    if( status !== "Semua" ) {
      option = Object.assign( option, { where: { status } } )
    }

    return prisma.orderan.findMany( option )
  }

  async paginate( data: {
    row: number,
    skip: number
  } ) {
    const { row, skip } = data
    return prisma.orderan.findMany( { take: row, skip } )
  }

  private setDataProduct( data: TOrderServer, method: string = "POST" ) {
    return data.semuaProduct.map( ( d: TPOrderan ) => (
        Object.assign( {
          harga     : d.harga,
          id        : method === "PUT" ? d.id : d.id + "_" + Date.now(),
          jenis     : d.jenis,
          jumlah    : d.jumlah,
          keterangan: d.keterangan,
          lokasi    : d.lokasi,
          img       : d.img,
          nama      : d.nama,
          orderanId : data.id
        } )
      )
    );
  }

  async createNesting( data: TOrderServer ) {

    return prisma.orderan.create( {
      data:
        Object.assign( this.setOne( data ),
          {
            semuaProduct: {
              createMany: {
                data: this.setDataProduct( data )
              }
            },
          }, ),

      include: {
        semuaProduct: true, // Include all posts in the returned object
      },
    } )

  }

  // -----DELETE
  async destroyOne( id: string ) {
    console.log( id )
    console.log( "one" )
    const delete1 = prisma.orderan.delete( {
      where : { id: id },
      select: { semuaProduct: true }
    } )

    const deleteMany = prisma.semuaProduct.deleteMany( {
      where: { orderanId: id },
    } )
    return prisma.$transaction( [ deleteMany, delete1 ] )
  }

  // -----DELETE
  async deleteMany( array: string [] ) {
    console.log( array )
    console.log( "many" )
    const id            = array.map( d => d )
    const deleteOrder   = prisma.orderan.deleteMany( { where: { id: { in: id } } } )
    const deleteProduct = prisma.semuaProduct.deleteMany( { where: { orderanId: { in: id } } } )
    return await prisma.$transaction( [ deleteProduct, deleteOrder ] )
  }

  async updateOneOnly( data: Partial<TOptional>, id: string, ) {
    return prisma.orderan.update( { where: { id: id }, data },
    )
  }

  async UpdateOneEx( data: TOrderServer, id: string, ) {
    const time = ( data.waktuKirim.toString().length === 5 )
                 ? data.waktuKirim + ":00"
                 : data.waktuKirim

    return await prisma.$transaction( [
      ...data.semuaProduct.map( d =>
        prisma.semuaProduct.updateMany( {
          where: { id: d.id },
          data : {
            // harga     : d.harga,
            // jenis     : d.jenis,
            jumlah: d.jumlah,
            // keterangan: d.keterangan,
            // lokasi    : d.lokasi,
            // nama      : d.nama,
            // orderanId : id
          },
        } )
      ),
      prisma.orderan.update( {
        where: { id: data.id },
        data : {
          alamatPenerima   : data.alamatPenerima,
          guna             : data.guna,
          hpPenerima       : data.hpPenerima,
          hpPengirim       : data.hpPenerima,
          id               : data.id,
          lokasi           : data.lokasi,
          namaPengiriman   : data.namaPengiriman,
          ongkir           : data.ongkir,
          penerima         : data.penerima,
          pengirim         : data.pengirim,
          pesan            : new Date( data.pesan ),
          kirim            : new Date( data.kirim ),
          waktuKirim       : new Date( data.pesan + "T" + time + ".000Z" ),
          semuaHargaItem   : data.semuaHargaItem,
          semuaHargaOrderan: data.semuaHargaOrderan,
          semuaHargaProduct: data.semuaHargaProduct,
          status           : data.status,
          totalBayar       : data.totalBayar,
          totalHarga       : data.totalHarga,
          totalPenjualan   : data.totalPenjualan,
          typePembayaran   : data.typePembayaran,
        },
      } ),
    ] );

    // const updateOrderan = prisma.orderan.update( {
    //   where: { id: id },
    //   data : this.setOne( data ),
    // } )
    // const dataku        = data.semuaProduct.map( d =>
    //   prisma.semuaProduct.update( {
    //     where: { id: d.id },
    //     data : {
    //       harga     : d.harga,
    //       jenis     : d.jenis,
    //       jumlah    : d.jumlah,
    //       keterangan: d.keterangan,
    //       lokasi    : d.lokasi,
    //       nama      : d.nama,
    //       orderanId : id
    //     },
    //   } )
    // )
    //
    // return await prisma.$transaction( [ updateOrderan, ...dataku ] );

    // const updateMany = data.semuaProduct.map( ( d: TPOrderan ) =>
    //   prisma.semuaProduct.update( {
    //     where: { id: d.id },
    //     data : {
    //       harga     : d.harga,
    //       jenis     : d.jenis,
    //       jumlah    : d.jumlah,
    //       keterangan: d.keterangan,
    //       lokasi    : d.lokasi,
    //       nama      : d.nama,
    //       orderanId : id
    //     }
    //   } ) )

    // return prisma.$transaction( [    updateMany] )
  }

  async UpdateMany( data: TOrderServer, id: string, ) {

    const updateData = prisma.orderan.update( {
      where: { id },
      data: this.setOne( data )
    } );

    const createMany = prisma.semuaProduct.createMany( {
      data: this.setDataProduct( data )
    } )

    const deleteProduct = prisma.semuaProduct.deleteMany( { where: { orderanId: id } } )
    return await prisma.$transaction( [ deleteProduct, createMany, updateData ] )
  }

  async updateOneNew( data: TOrderServer, id: string, ) {
    // console.log(data)
    return prisma.orderan.update( {
        where: { id: id },
        data : this.setOne( data )
      }
    )

  }
}

//   async updateOne( data: TOrderServer, id: string, ) {
//     return prisma.orderan.update( {
//       where: { id: id },
//       data :
//         Object.assign( this.setOne( data ),
//           {
//             semuaProduct: {
//               updateMany: {
//                 where: { id: data.semuaProduct.map( d => d.id ) },
//                 data : this.setDataProduct( data )
//               }
//             }
//           } )
//     } )
//   }
// }