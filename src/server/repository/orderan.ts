import { prisma, }      from '@/server/models/prisma/config';
import { zOrderanType } from '@/server/service/orderan';

type TYPE = zOrderanType
// getAll data from database
const findAll = async () => {
  return await prisma.orderan.findMany()
}

//get only one  data from database
const findById = async ( id: string ) => {
  return prisma.orderan.findUnique( { where: { id } } )
}

//get per page data from database
const paginate = async ( data: { row: number, skip: number } ) => {
  const { row, skip } = data
  return prisma.orderan.findMany( { take: row, skip } )
}

//create data from database
const create = async ( data: TYPE ) => {

  const dataRepo: TYPE = {
    pesan            : data.pesan,
    kirim            : data.kirim,
    waktuKirim       : data.waktuKirim,
    pengirim         : data.pengirim,
    hpPengirim       : data.hpPengirim,
    penerima         : data.penerima,
    alamatPenerima   : data.alamatPenerima,
    hpPenerima       : data.hpPenerima,
    guna             : data.guna,
    lokasi           : data.lokasi,
    namaPengiriman   : data.namaPengiriman,
    ekspedisi        : data.ekspedisi,
    ongkir           : data.ongkir,
    id               : data.id,
    no               : data.no,
    typePembayaran   : data.typePembayaran,
    total            : data.total,
    totalBayar       : data.totalBayar,
    totalPenjualan   : data.totalPenjualan,
    status           : data.status,
    semuaHargaOrderan: data.semuaHargaOrderan,
    semuaHargaItem   : data.semuaHargaItem,
    semuaHargaProduct: data.semuaHargaProduct,
    totalHarga       : data.totalHarga,
    semuaProduct     : data.semuaProduct,
  }

  prisma.orderan.create( {
    data: { //keterangan orang
      pengirim      : "Pengirim",
      hpPengirim    : "Hp Pengirim",
      penerima      : "Penerima",
      alamatPenerima: "Alamat Penerima",
      hpPenerima    : "Hp Penerima",
//tanggal pesan
      pesan     : "Pesan",
      kirim     : "Kirim",
      waktuKirim: new Date( 'July 1, 1999, 12:00:00' ),
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
      guna  : "Keterangan",
      lokasi: "Lokasi",
//travel
      namaPengiriman: "Nama Travel",
      ekspedisi     : "Ekspedisi",
      ongkir        : 23,
//total
      id            : "1231231",
      no            : "No",
      typePembayaran: "Pembayaran",
      total         : 123,
      totalBayar    : 123,
      totalPenjualan: 232,
      status        : "Status",
      //total
      semuaHargaProduct: 12312,
      semuaHargaItem   : 12312,
      semuaHargaOrderan: 12312,
      totalHarga       : 1231
    }
  } )

}
//edit data from database
const update = async ( data: TYPE, id: string ) => {

  return prisma.orderan.updateMany( {
    where: { id: id },
    data : {}
  } )
}

//delete data from database
const destroy = async ( id: string ) => {
  return prisma.orderan.deleteMany( { where: { id } } )
}
const Repo    = { findAll, create, destroy, paginate, findById, update }
export default Repo