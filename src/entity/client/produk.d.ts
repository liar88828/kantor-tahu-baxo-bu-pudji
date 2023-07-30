import { z }      from "zod";
import Validation from '@/lib/validation/schema';

export type TProduct = {
  id: string
  nama: string,
  harga: number,
  lokasi: string,
  jumlah: number,
  jenis: "Orderan" | "Item" | string,
  img?: string
  keterangan: string,

}

export interface Res {
  films: string;
  people: string;
}