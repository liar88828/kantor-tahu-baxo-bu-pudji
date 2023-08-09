
export type TProduct = {
  id: string
  nama: string,
  lokasi: string,
  harga: number,
  jumlah: number,
  jenis: "Orderan" | "Item" | string,
  keterangan: string,
  img?: string

}
// '{"nama":"Tahu Baxo Bu Pudji",
// "harga":"20000",
// "lokasi":"Ungaran ",
// "jenis":"Orderan",
// "keterangan":"Pedas "}'
//id, jumlah, img

export interface Res {
  films: string;
  people: string;
}