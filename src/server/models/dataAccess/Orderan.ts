import { prisma }       from '@/server/models/prisma/config';
import { Prisma }       from '../../../../prisma/data';
import { TOrderServer } from '@/entity/server/orderan';
import { TProduct }     from '@/entity/client/produk';

export type TYPE = Prisma.OrderanCreateInput
export default class AccessOrderan {

  async findOne( id: string ) {
    return prisma.orderan.findUnique( {
      where  : { id: id },
      include: {
        semuaProduct: true
      }
    } )
  }

  async findAll( data: Prisma.OrderanSelect ) {
    return prisma.orderan.findMany( {
      take   : 400,
      orderBy: {
        created_at: "asc"
      },
      include: {
        semuaProduct: true
      }
    } )
  }

  async Paginate( skip: number = 1, take: number = 100, add: number = 0 ) {

    // all in database 1000
    // take =100
    // skip =1

    // take ada 50 row
    add = take + add// ada 50 row

    //  page yang ke 1,2,3
    const page = skip * take
    return prisma.orderan.findMany( {
      skip   : page,
      take   : add,
      orderBy: {
        created_at: "asc"
      },
    } )
  }

  async CreateManyNesting( data: Prisma.OrderanCreateInput & TOrderServer ) {
    return prisma.orderan.create( {
      data: {
        //orang
        alamatPenerima: data.alamatPenerima,
        ekspedisi     : data.ekspedisi,
        guna          : data.guna,
        hpPenerima    : data.hpPenerima,
        hpPengirim    : data.hpPenerima,
//tanggal pesan
        id        : data.id,
        keterangan: data.keterangan,
        kirim     : data.kirim,

//orderan
        lokasi: data.lokasi,

//keterangan
        namaPengiriman: data.namaPengiriman,
        no            : data.no,
        ongkir        : data.ongkir,
//travel
        penerima: data.penerima,
        pengirim: data.pengirim,
        pesan   : data.pesan,
//total
        //total semua,
        semuaHargaItem   : data.semuaHargaItem,
        semuaHargaOrderan: data.semuaHargaOrderan,
        semuaHargaProduct: data.semuaHargaProduct,
        semuaProduct     : {
          createMany: {
            data: data.semuaProduct.map( ( d: TProduct ) => {

              // if( !d.img ) {
              //   d.img = "no image"
              // }

              // if( d.img == null || d.img == undefined ) {
              //   d.img = "no image"
              // }

              // if( typeof d.img !== "string" ) {
              //   d.img = "no image"
              // }

              // d.img = !d.img ? "no image" : d.img
              // let imgDenganOr       = d.img || "no image"
              // let imgDenganQuestion = d.img ?? "no image"

              return (
                {
                  img       : d.img || "no image",
                  id        : d.id,
                  harga     : d.harga,
                  jenis     : d.jenis,
                  jumlah    : d.jumlah,
                  keterangan: d.keterangan,
                  lokasi    : d.lokasi,
                  nama      : d.nama
                }
              )
            } )
          }
        },
        status           : data.status,
        total            : data.total,
        totalBayar       : data.totalBayar,
        totalHarga       : data.totalHarga,
        //total semua,

        totalPenjualan: data.totalPenjualan,
        typePembayaran: data.typePembayaran,
        waktuKirim    : data.waktuKirim
      },

      include: {
        semuaProduct: true, // Include all posts in the returned object
      },
    } )
  }

  async CreateManyTransaction( data: TOrderServer ) {

    const createOrderan = prisma.orderan.create( {
      data: {
        //orang
        alamatPenerima: data.alamatPenerima,
        ekspedisi     : data.ekspedisi,
        guna          : data.guna,
        hpPenerima    : data.hpPenerima,
        hpPengirim    : data.hpPenerima,
//tanggal pesan
        id        : data.id,
        keterangan: data.keterangan,
        kirim     : data.kirim,
//orderan
        lokasi: data.lokasi,
//keterangan
        namaPengiriman: data.namaPengiriman,
        no            : data.no,
        ongkir        : data.ongkir,
//travel
        penerima: data.penerima,
        pengirim: data.pengirim,
        pesan   : data.pesan,
//total
        //total semua,
        semuaHargaItem   : data.semuaHargaItem,
        semuaHargaOrderan: data.semuaHargaOrderan,
        semuaHargaProduct: data.semuaHargaProduct,

        status    : data.status,
        total     : data.total,
        totalBayar: data.totalBayar,
        totalHarga: data.totalHarga,
        //total semua,

        totalPenjualan: data.totalPenjualan,
        typePembayaran: data.typePembayaran,
        waktuKirim    : data.waktuKirim
      },
    } )

    const createSemuaProduk = prisma.semuaProduct.createMany( {
      data: data.semuaProduct.map( d => (
        {
          harga     : d.harga,
          id        : d.id,
          img       : d.img || "no image",
          jenis     : d.jenis,
          jumlah    : d.jumlah,
          keterangan: d.keterangan,
          lokasi    : d.lokasi,
          nama      : d.nama,
          orderanId : data.id
        }
      ) )
    } )

    return prisma.$transaction( [ createOrderan, createSemuaProduk ] )
  }

  async UpdateMany( id: string, data: Prisma.OrderanUpdateManyMutationInput ) {

    return prisma.orderan.updateMany( {
      where: { id },
      data : {
        //orang
        pengirim      : data.pengirim,
        hpPengirim    : data.hpPenerima,
        penerima      : data.penerima,
        alamatPenerima: data.alamatPenerima,
        hpPenerima    : data.hpPenerima,
//tanggal pesan
        pesan     : data.pesan,
        waktuKirim: data.waktuKirim,
        kirim     : data.kirim,
//keterangan
        guna      : data.guna,
        keterangan: data.keterangan,
        lokasi    : data.lokasi,
//travel
        namaPengiriman: data.namaPengiriman,
        ekspedisi     : data.ekspedisi,
        ongkir        : data.ongkir,
//total
        id            : data.id,
        no            : data.no,
        typePembayaran: data.typePembayaran,
        total         : data.total,
        totalBayar    : data.totalBayar,
        totalPenjualan: data.totalPenjualan,
        status        : data.status,
        //total semua
        semuaHargaProduct: data.semuaHargaProduct,
        semuaHargaItem   : data.semuaHargaItem,
        semuaHargaOrderan: data.semuaHargaOrderan,
        totalHarga       : data.totalHarga,

      },

    } )
  }

  async UpdateOne( id: string, data: TOrderServer ) {
    const updateOrderan = prisma.orderan.update( {
      where: { id: data.id },
      data : {
        //orang
        alamatPenerima: data.alamatPenerima,
        ekspedisi     : data.ekspedisi,
        guna          : data.guna,
        hpPenerima    : data.hpPenerima,
        hpPengirim    : data.hpPenerima,
//tanggal pesan
        id        : data.id,
        keterangan: data.keterangan,
        kirim     : data.kirim,
//orderan
        lokasi: data.lokasi,
//keterangan
        namaPengiriman: data.namaPengiriman,
        no            : data.no,
        ongkir        : data.ongkir,
//travel
        penerima: data.penerima,
        pengirim: data.pengirim,
        pesan   : data.pesan,
//total
        //total semua,
        semuaHargaItem   : data.semuaHargaItem,
        semuaHargaOrderan: data.semuaHargaOrderan,
        semuaHargaProduct: data.semuaHargaProduct,

        status    : data.status,
        total     : data.total,
        totalBayar: data.totalBayar,
        totalHarga: data.totalHarga,
        //total semua,

        totalPenjualan: data.totalPenjualan,
        typePembayaran: data.typePembayaran,
        waktuKirim    : data.waktuKirim
      },
    } )

    const updateSemuaProduk = prisma.semuaProduct.updateMany( {
      data: data.semuaProduct.map( d => (
        {
          harga     : d.harga,
          id        : d.id,
          img       : d.img || "no image",
          jenis     : d.jenis,
          jumlah    : d.jumlah,
          keterangan: d.keterangan,
          lokasi    : d.lokasi,
          nama      : d.nama,
          orderanId : data.id
        }
      ) )
    } )

    return prisma.$transaction( [ updateOrderan, updateSemuaProduk ] )
  }

  async DeleteOne( id: string ) {
    return prisma.orderan.delete( {
      where  : { id: id },
      include: { semuaProduct: { where: { orderanId: id } } }
    } )
  }

  async DeleteMany( id: string ) {

    const deleteProduk = prisma.semuaProduct.deleteMany( {
      where: { orderanId: id }
    } )

    const deleteOrder = prisma.orderan.delete( {
      where  : { id: id },
      include: { semuaProduct: true }
    } )
    await prisma.$transaction( [ deleteProduk, deleteOrder ]
    )
  }

  protected setCreate( data: Prisma.OrderanCreateInput ) {
    return {}
  }

  private DataOrder( data: Prisma.OrderanUpdateInput ) {
    return {
      //orang
      pengirim      : data.pengirim,
      hpPengirim    : data.hpPenerima,
      penerima      : data.penerima,
      alamatPenerima: data.alamatPenerima,
      hpPenerima    : data.hpPenerima,
//tanggal pesan
      pesan     : data.pesan,
      waktuKirim: data.waktuKirim,
      kirim     : data.kirim,
//keterangan
      guna      : data.guna,
      keterangan: data.keterangan,
      lokasi    : data.lokasi,
//travel
      namaPengiriman: data.namaPengiriman,
      ekspedisi     : data.ekspedisi,
      ongkir        : data.ongkir,
//total
      id            : data.id,
      no            : data.no,
      typePembayaran: data.typePembayaran,
      total         : data.total,
      totalBayar    : data.totalBayar,
      totalPenjualan: data.totalPenjualan,
      status        : data.status,
      //total semua
      semuaHargaProduct: data.semuaHargaProduct,
      semuaHargaItem   : data.semuaHargaItem,
      semuaHargaOrderan: data.semuaHargaOrderan,
      totalHarga       : data.totalHarga
    }
  }

}

//
// interface OrderData {
//   alamatPenerima: string;
//   ekspedisi: string;
//   guna: string;
//   hpPenerima: string;
//   hpPengirim: string;
//   id: string;
//   keterangan: string;
//   kirim: string;
//   lokasi: string;
//   namaPengiriman: string;
//   no: string;
//   ongkir: number;
//   penerima: string;
//   pengirim: string;
//   pesan: string;
//   semuaHargaItem: number;
//   semuaHargaOrderan: number;
//   semuaHargaProduct: number;
//   semuaProduct: [ {
//     harga: number;
//     id: string;
//     img: string;
//     jenis: string;
//     jumlah: number;
//     keterangan: string;
//     lokasi: string;
//     nama: string;
//   } ];
//   status: string;
//   total: number;
//   totalBayar: number;
//   totalHarga: number;
//   totalPenjualan: number;
//   typePembayaran: string;
//   waktuKirim: string;
// }
