import { TDeliveryCreate, TDeliveryDB } from "@/interface/entity/delivery.model"

export const exampleDelivery: TDeliveryDB = {
  id: "kosong",
  name: "kosong",
  phone: "kosong",
  address: "kosong",
  type: "kosong",
  price: 0,
  img: "kosong",
  desc: "kosong",
  created_at: new Date(),
  updated_at: new Date(),
}
export const exampleDeliveryCreate: TDeliveryCreate = {
  name: "kosong",
  phone: "kosong",
  address: "kosong",
  type: "kosong",
  price: 0,
  img: "kosong",
  desc: "kosong",
}
