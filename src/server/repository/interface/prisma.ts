export type TPProduk = {
  id: string
  nama: string;
  harga: number;
  lokasi: string;
  jumlah: number;
  jenis: "Orderan" | "Item" | string;
  img: string;
  keterangan: string;
}
