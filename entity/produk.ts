export type TFormProduct = {
  id: string
  nama: string,
  harga: number,
  lokasi: string,
  jumlah: number,
  jenis: "Orderan" | "Item" | string,
  img?: string
}

const productList: TFormProduct[] = [
  {
    id: "Un/It/TBRe/42",
    nama: "Tahu Bakso Rebus",
    harga: 42_000,
    lokasi: "Ungaran",
    jumlah: 1,
    jenis: "Item",
    img: "product_image.jpg"
  }
  ,
  {
    id: "Se/Or/TBVa/42",
    nama: "Tahu Bakso Vakum",
    harga: 46_000,
    lokasi: "Semarang",
    jenis: "Orderan",
    jumlah: 1,
    img: "product_image.jpg"
  },
  {
    id: "Se/Or/TBSp/42",
    nama: "Tahu Bakso Special",
    harga: 50_000,
    lokasi: "Semarang",
    jenis: "Orderan",
    jumlah: 1,
    img: "product_image.jpg"
  },
  {
    id: "Un/It/TBGo/42",
    nama: "Tahu Bakso Goreng",
    harga: 45_000,
    lokasi: "Ungaran",
    jenis: "Item",
    jumlah: 1,
    img: "product_image.jpg"
  }

]

//
// const product = [
//   // { nama: "Tahu Bakso Rebus", harga: 42.000 },
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

export const sProduct: TFormProduct[] = [
  {
    id: "Un/It/TBR/42",
    nama: "Tahu Bakso Rebus",
    harga: 42_000,
    lokasi: "Ungaran",
    jenis: "Item",
    jumlah: 1,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/28/Bakso_mi_bihun.jpg"
  },

  {
    id: "Se/Or/TBV/42",
    nama: "Tahu Bakso Vakum",
    jumlah: 1,
    harga: 46_000,
    lokasi: "Semarang",
    jenis: "Orderan",
    img: "https://img.kurio.network/xAbHWPE-jbNSWEWyRoCLxJM6sac=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/09/06/2c552606-f62f-475d-81db-e9a57e963a3f.jpe"
  },

  {
    id: "Un/It/TBGo/42",
    nama: "Tahu Bakso Goreng",
    jumlah: 1,
    harga: 45_000,
    lokasi: "Ungaran",
    jenis: "Item",
    img: "https://img.kurio.network/xAbHWPE-jbNSWEWyRoCLxJM6sac=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/09/06/2c552606-f62f-475d-81db-e9a57e963a3f.jpe"
  },

  {
    id: "Se/Or/TBSp/42",
    nama: "Tahu Bakso Special",
    harga: 50_000,
    lokasi: "Semarang",
    jenis: "Orderan",
    jumlah: 1,
    img: "https://img.kurio.network/xAbHWPE-jbNSWEWyRoCLxJM6sac=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/09/06/2c552606-f62f-475d-81db-e9a57e963a3f.jpe"
  }

]
