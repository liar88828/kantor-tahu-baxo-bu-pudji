type TProOrderan = {
  id?: string
  nama: string,
  harga: number,
  lokasi: string,
  img: string,
  jumlah: number,
  jenis: "Orderan" | "Item" | string,
  keterangan: string,
  orderanId?: string
}

