import { prisma, }      from '@/server/models/prisma/config';
// import { TYPE }         from '@/server/models/dataAccess/Orderan';
import { TOrderServer } from '@/entity/server/orderan';

// getAll data from database
const findAll = async () => {
  return await prisma.orderan.findMany()
}

//get only one  data from database
const findById = async ( id: string ) => {
  return prisma.orderan.findUnique( { where: { id } } )
}

//get per page data from database
const paginate = async ( data: {
  row: number,
  skip: number
} ) => {
  const { row, skip } = data
  return prisma.orderan.findMany( { take: row, skip } )
}

//create data from database
const create = async ( data: TOrderServer ) => {

  // let dataku = data.semuaProduct.map( d =>
  //   (
  //     d.img,
  //       d.id,
  //       d.harga,
  //       d.jenis,
  //       d.keterangan,
  //       d.lokasi,
  //       d.nama
  //   )
  // )

// : TProduct = data.semuaProduct
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
          data: data.semuaProduct.map( d => {
            return (
              {
                img       : d.img || "no image",
                id        : d.id,
                harga     : d.harga,
                jenis     : d.jenis,
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

//edit data from database
// const update = async ( data: TYPE, id: string ) => {
//
//   return prisma.orderan.updateMany( {
//     where: { id: id },
//     data : {}
//   } )
// }

//delete data from database
const destroy = async ( id: string ) => {
  return prisma.orderan.deleteMany( { where: { id } } )
}
const Repo    = { findAll, create, destroy, paginate, findById, }
export default Repo