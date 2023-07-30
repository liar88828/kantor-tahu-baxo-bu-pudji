import { prisma, }      from '@/server/models/prisma/config';
// import { TYPE }         from '@/server/models/dataAccess/Orderan';
import { TOrderServer } from '@/entity/server/orderan';
import { Prisma }       from '../../../prisma/data';

export default class RepoOrderan {
// getAll data from database
  async findAll() {
    return prisma.orderan.findMany( {
      // take   : 500,
      // include: {
      //   semuaProduct: {
      //     select: {
      //       nama: true
      //     }
      //   }
      // }
      take   : 400,
      orderBy: {
        created_at: "asc"
      },
      include: {
        semuaProduct: true
      }

    } )
  }

//get only one  data from database
  async findById( id: string ) {
    return prisma.orderan.findUnique( {
      where  : { id },
      include: { semuaProduct: true }
    } )
  }

//get per page data from database
  async paginate( data: {
    row: number,
    skip: number
  } ) {
    const { row, skip } = data
    return prisma.orderan.findMany( { take: row, skip } )
  }

//create data from database
  async createNesting( data: TOrderServer ) {

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
            data: data.semuaProduct.map( d => ( {
                img       : d.img || "no image",
                id        : d.id,
                harga     : d.harga,
                jenis     : d.jenis,
                keterangan: d.keterangan,
                lokasi    : d.lokasi,
                nama  : d.nama,
                jumlah: d.jumlah
              } )
            )
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

  async updateOne( data: TOrderServer, id: string, ) {
    return prisma.orderan.update( {
      where: { id: id },
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
        waktuKirim    : data.waktuKirim,
        semuaProduct  : {
          updateMany: {
            where: { id },
            data : data.semuaProduct.map( d => ( {
                img       : d.img || "no image",
                id        : d.id,
                harga     : d.harga,
                jenis     : d.jenis,
                keterangan: d.keterangan,
                lokasi    : d.lokasi,
                nama      : d.nama,
                jumlah    : d.jumlah,

              }
            ) )
          }
        }

      },
    } )

    // const updateAll = prisma.semuaProduct.updateMany( {
    //   where:{id},
    //   data: data.semuaProduct.map( ( d: TPOrderan ): TPOrderan => ( {
    //     harga     : d.harga,
    //     id        : d.id,
    //     img       : d.img || "no image",
    //     jenis     : d.jenis,
    //     jumlah    : d.jumlah,
    //     keterangan: d.keterangan,
    //     lokasi    : d.lokasi,
    //     nama      : d.nama,
    //     orderanId : id,
    //
    //   } ) )
    // } )

    // return prisma.$transaction( [ updateAll, update1,
    // ] )
  }

//delete data from database
  async destroyOne( id: string ) {
    const delete1 = prisma.orderan.delete( {
      where : { id: id },
      select: { semuaProduct: true }
    } )

    const deleteMany = prisma.semuaProduct.deleteMany( {
      where: { orderanId: id },
    } )
    return prisma.$transaction( [ deleteMany, delete1 ] )

  }

  async UpdateOneEx( id: string, data: TOrderServer ) {
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

}