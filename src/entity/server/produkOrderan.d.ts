export type TPOrderan = {
  id?: string
  nama: string,
  harga: number,
  lokasi: string,
  jumlah: number,
  jenis: "Orderan" | "Item" | string,
  keterangan: string,
  orderanId?: string
}

// id
// nama
// harga
// lokasi
// jumlah
// jenis
