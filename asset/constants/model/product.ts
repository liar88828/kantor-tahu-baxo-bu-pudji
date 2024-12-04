import { jpgTextNotFound } from '../data/images';

export const formProduct: Record<keyof TProduct, any> = {
  id        : "",
  nama      : "Nama Produk",
  harga     : "Harga Produk",
  lokasi    : "Lokasi Produk",
  jumlah    : "Masukan Jumlah",
  jenis     : "Jenis Produk",
  img       : "Gambar Produk",
  keterangan: "Keterangan Produk"
}

export const defaultFormProduct: TProduct = {
  id        : "",
  nama      : "",
  harga     : 0,
  lokasi    : "",
  jumlah    : 0,
  jenis     : "",
  img       : jpgTextNotFound,
  keterangan: ""
}

// export const product  = [
//   { nama: "Tahu Bakso Rebus", harga: 42.000 },
//   { nama: "Tahu Bakso Vakum", harga: 46.000 },
//   { nama: "Tahu Bakso Special", harga: 50.000 },
//   { nama: "Tahu Bakso Goreng", harga: 45.000 },
//   { nama: "Bandeng Presto", harga: 60.000 },
//   { nama: "Otak-Otak Bandeng", harga: 70.000 },
//   { nama: "Bakso Sapi 20", harga: 40.000 },
//   { nama: "Bakso Sapi 12", harga: 25.000 },
//   { nama: "Bakso Aneka", harga: 29.000 },
//   { nama: "Nugget", harga: 27.000 },
//   { nama: "Rolade Tahu", harga: 19.000 },
//   { nama: "Rolade Singkong", harga: 19.000 },
// ]
