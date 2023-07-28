import { Prisma, PrismaClient } from '../../../../prisma/data';

export const prisma = new PrismaClient()

class Seed {
  async ShowOrderan() {
    return prisma.orderan.findMany( {
      include: {
        semuaProduct: true
      }
    } )
  }

  async CreateOrderan() {

    return prisma.orderan.create( {
      data: {
        //orang
        pengirim      : "orang genah",
        hpPengirim    : "Hp Pengirim",
        penerima      : "Penerima",
        alamatPenerima: "Alamat Penerima",
        hpPenerima    : "Hp Penerima",
//tanggal pesan
        pesan     : new Date( 'July 1, 1999, 12:00:00' ),
        waktuKirim: new Date( '2023-07-20' ),
        kirim     : new Date( 'July 1, 1999, 12:00:00' ),

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
              {
                id        : "734e7c49-c119-4146-bad-d2a4a247e",
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
        guna      : "Keterangan",
        keterangan: "sangat jelas",
        lokasi    : "Lokasi",
//travel
        namaPengiriman: "Nama Travel",
        ekspedisi     : "Ekspedisi",
        ongkir        : 23,
//total
        id            : "efcebef1-2e79-44b4-accb-282494a0",
        no            : "No",
        typePembayaran: "Pembayaran",
        total         : 123,
        totalBayar    : 123,
        totalPenjualan: 232,
        status        : "Status",
        //total semua
        semuaHargaProduct: 12312,
        semuaHargaItem   : 12312,
        semuaHargaOrderan: 12312,
        totalHarga       : 1231,
        created_at       : new Date( 'July 1, 1999, 12:00:00' ),
        updated_at       : new Date( 'July 1, 1999, 12:00:00' ),
      },

      include: {
        semuaProduct: true, // Include all posts in the returned object
      },
    } )

  }

  async Update() {
    return prisma.orderan.findMany( {
      include: {
        semuaProduct: true
      }
    } )
  }
}

const dataset: Prisma.OrderanCreateInput = {
  //orang
  pengirim      : "Pengirim",
  hpPengirim    : "Hp Pengirim",
  penerima      : "Penerima",
  alamatPenerima: "Alamat Penerima",
  hpPenerima    : "Hp Penerima",
//tanggal pesan
  pesan     : new Date( '2023-07-14' ),
  waktuKirim: new Date( ' 12:00:00' ),
  kirim     : new Date( '2023-07-14' ),

//orderan
  semuaProduct: {
    createMany: {
      data: [
        {
          id        : "asdasdas",
          nama      : "Tahu Bakso Rebus",
          harga     : 42_000,
          lokasi    : "Ungaran",
          jenis     : "Item",
          jumlah    : 10,
          keterangan: "Enak",
          img       : "bagus"
        },
        {
          id        : "Se/Or/TBSp/42asdas",
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
  guna      : "Keterangan",
  keterangan: "sangat jelas",
  lokasi    : "Lokasi",
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
  //total semua
  semuaHargaProduct: 12312,
  semuaHargaItem   : 12312,
  semuaHargaOrderan: 12312,
  totalHarga       : 1231,
  created_at       : new Date( 'July 1, 1999, 12:00:00' ),
  updated_at       : new Date( 'July 1, 1999, 12:00:00' ),
}

export default Seed