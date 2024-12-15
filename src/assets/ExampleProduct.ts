import { TProductCreate, TProductDB } from "@/entity/product.model"

export const exampleProduct: TProductCreate = {
  price: 0,
  img: "kosong",
  type: "kosong",
  qty: 0,
  desc: "kosong",
  location: "kosong",
  name: "kosong",
}
const productOne = {
  id: "Se/Or/TBSp/42",
  nama: "Tahu Bakso Special",
  harga: 50_000,
  lokasi: "Semarang",
  jenis: "Orderan",
  jumlah: 1,
  keterangan: "Pedas",
  img: "https://img.kurio.network/xAbHWPE-jbNSWEWyRoCLxJM6sac=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/21/09/06/2c552606-f62f-475d-81db-e9a57e963a3f.jpe",
}
export const defaultFormProduct: TProductDB = {
  id: "",
  name: "Tahu Baxo",
  price: 20000,
  location: "Ungaran",
  qty: 0,
  type: "Orderan",
  img: "",
  desc: "Pedas",
  created_at: new Date(),
  updated_at: new Date(),
}


export const exampleDataProduct: TProductDB[] = [
  {
    id: "12345", // unique ID
    name: "Tahu Baxo",
    price: 20000,
    location: "Ungaran",
    qty: 0,
    type: "Orderan",
    img: "", // image URL or path
    desc: "Pedas",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "12346",
    name: "Bakso Malang",
    price: 25000,
    location: "Semarang",
    qty: 10,
    type: "Orderan",
    img: "https://example.com/bakso-malang.jpg",
    desc: "Lezat dan Gurih",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "12347",
    name: "Mie Ayam",
    price: 15000,
    location: "Solo",
    qty: 5,
    type: "Orderan",
    img: "https://example.com/mie-ayam.jpg",
    desc: "Mie dengan ayam suwir dan kuah segar",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "12348",
    name: "Sate Padang",
    price: 30000,
    location: "Padang",
    qty: 8,
    type: "Orderan",
    img: "https://example.com/sate-padang.jpg",
    desc: "Sate dengan kuah kacang pedas",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: "12349",
    name: "Nasi Goreng Spesial",
    price: 18000,
    location: "Jakarta",
    qty: 12,
    type: "Orderan",
    img: "https://example.com/nasi-goreng.jpg",
    desc: "Nasi goreng dengan berbagai topping",
    created_at: new Date(),
    updated_at: new Date(),
  },
]
