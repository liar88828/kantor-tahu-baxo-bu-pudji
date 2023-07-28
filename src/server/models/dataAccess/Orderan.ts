import { prisma } from '@/server/models/prisma/config';
import { Prisma } from '../../../../prisma/data';

// interface IOrderanAccess {
//
// }

// type PrismaCreate = Prisma.OrderanUpdateInput | {
//   semuaProduct: Prisma.ProdukFind
// }

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

  async CreateMany( data: Prisma.OrderanCreateInput ) {

    return prisma.orderan.create( {
      data: {
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

//orderan
        semuaProduct: {
          createMany: {
            data: [
              {
                id        : "70ecc103-2b06-4ab-9bfc-2a23eb69a",
                nama      : "Tahu Bakso Rebus",
                harga     : 42_000,
                lokasi    : "Ungaran",
                jenis     : "Item",
                jumlah    : 10,
                keterangan: "Enak",
                img       : "bagus"
              },
            ]
          }
        },

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
      },

      include: {
        semuaProduct: true, // Include all posts in the returned object
      },
    } )

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

  async UpdateOne( id
    :
    string, data
    :
    Prisma.OrderanUpdateInput
  ) {
    return prisma.orderan.updateMany( {
      where: { id },
      data : this.DataOrder( data )

    } )
  }

  async DeleteOne( id
    :
    string
  ) {
    return prisma.orderan.delete( {
      where: { id: id }
    } )
  }

  async DeleteMany( id
    :
    string
  ) {
    return prisma.orderan.deleteMany( {
      where: { id: id }
    } )
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



