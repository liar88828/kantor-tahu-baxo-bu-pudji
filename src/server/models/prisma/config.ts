import { TOrderServer } from '@/entity/server/orderan';
import { Prisma, PrismaClient } from '../../../../prisma/data';

export const prisma = new PrismaClient()

//create data from database
export const create = async ( data: Prisma.OrderanCreateInput ) => {
  const {
          lokasi, jenis, nama, harga, img, id, jumlah, keterangan
        } = data.semuaProduct as Prisma.SemuaProductCreateInput;
  return prisma.orderan.create( {
    data   : {
      alamatPenerima   : data.alamatPenerima,
      ekspedisi        : data.ekspedisi,
      guna             : data.guna,
      hpPenerima       : data.hpPenerima,
      hpPengirim       : data.hpPenerima,
      id               : data.id,
      keterangan       : data.keterangan,
      kirim            : data.kirim,
      lokasi           : data.lokasi,
      namaPengiriman   : data.namaPengiriman,
      no               : data.no,
      ongkir           : data.ongkir,
      penerima         : data.penerima,
      pengirim         : data.penerima,
      pesan            : data.pesan,
      semuaHargaItem   : data.semuaHargaItem,
      semuaHargaOrderan: data.semuaHargaOrderan,
      semuaHargaProduct: data.semuaHargaProduct,
      semuaProduct     : {
        createMany: {
          data: [
            {
              harga     : harga,
              id        : id,
              img       : img,
              jenis     : jenis,
              jumlah    : jumlah,
              keterangan: keterangan,
              lokasi    : lokasi,
              nama      : nama,
            },
          ]
        }
      },
      status           : data.status,
      total            : data.total,
      totalBayar       : data.totalBayar,
      totalHarga       : data.totalHarga,
      totalPenjualan   : data.totalPenjualan,
      typePembayaran   : data.typePembayaran,
      waktuKirim       : data.waktuKirim,
    },
    include: {
      semuaProduct: true,
    },
  } )
}

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
                id: "70ecc103-2b06-s4ab-9bfc-2a23eb69a",
                nama      : "Tahu Bakso Rebus",
                harga     : 42_000,
                lokasi    : "Ungaran",
                jenis     : "Item",
                jumlah    : 10,
                keterangan: "Enak",
                img       : "bagus"
              },
              {
                id: "734e7c49-c11s9-4146-bad-d2a4a247e",
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
        id: "efcebef1-2e79-44b4-asccb-282494a0",
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

const dataku: TOrderServer =
        {
          "id"               : "asdasd",
          "no"               : "string",
          "guna"             : "string",
          "ongkir"           : 3681802,
          "lokasi"           : "string",
          "kirim"            : "12:00:00",
          "pesan"            : "12:00:00",
          "penerima"         : "string",
          "pengirim"         : "string",
          "ekspedisi"        : "string",
          "hpPenerima"       : "string",
          "hpPengirim"       : "string",
          "keterangan"       : "string",
          "semuaHargaItem"   : 3681802,
          "alamatPenerima"   : "string",
          "namaPengiriman"   : "string",
          "semuaHargaOrderan": 3681802,
          "semuaHargaProduct": 3681802,
          "semuaProduct"     : [
            {
              "id"        : "asdasda",
              "img"       : "string",
              "harga"     : 3681802,
              "nama"      : "string",
              "jenis"     : "string",
              "jumlah"    : 3681802,
              "lokasi"    : "string",
              "keterangan": "string"
            },

            {
              "id"        : "asdasda",
              "img"       : "string",
              "harga"     : 3681802,
              "nama"      : "string",
              "jenis"     : "string",
              "jumlah"    : 3681802,
              "lokasi"    : "string",
              "keterangan": "string"
            }
          ],
          "total"            : 3681802,
          "status"           : "string",
          "totalBayar"       : 3681802,
          "totalHarga"       : 3681802,
          "waktuKirim"       : "12:00:00",
          "totalPenjualan"   : 3681802,
          "typePembayaran"   : "string"
        }

export type validDataOrder = {
  pengirim: string;
  hpPengirim: string;
  penerima: string;
  alamatPenerima: string;
  hpPenerima: string;
  pesan: Date;
  waktuKirim: Date;
  kirim: Date;
  semuaProduct: {
    createMany: {
      data: (
        {
          keterangan: string;
          img: string;
          nama: string;
          harga: number;
          jumlah: number;
          lokasi: string;
          jenis: string;
          id: string
        } | {
        keterangan: string;
        img: string;
        nama: string;
        harga: number;
        jumlah: number;
        lokasi: string;
        jenis: string;
        id: string
      }[] )
    }
  };
  guna: string;
  keterangan: string;
  lokasi: string;
  namaPengiriman: string;
  ekspedisi: string;
  ongkir: number;
  id: string;
  no: string;
  typePembayaran: string;
  total: number;
  totalBayar: number;
  totalPenjualan: number;
  status: string;
  semuaHargaProduct: number;
  semuaHargaItem: number;
  semuaHargaOrderan: number;
  totalHarga: number;
  created_at: Date;
  updated_at: Date;
}

const datas: validDataOrder = {
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
          id        : "70ecc103-2b06-s4ab-9bfc-2a23eb69a",
          nama      : "Tahu Bakso Rebus",
          harga     : 42_000,
          lokasi    : "Ungaran",
          jenis     : "Item",
          jumlah    : 10,
          keterangan: "Enak",
          img       : "bagus"
        },
        {
          id        : "734e7c49-c11s9-4146-bad-d2a4a247e",
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
  id            : "efcebef1-2e79-44b4-asccb-282494a0",
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