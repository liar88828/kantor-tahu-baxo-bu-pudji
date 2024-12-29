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
    name: "John Doe",
    phone: "+6234567890",
    address: "123 Main St, Springfield, IL, 62701",
    type: "Standard",
    price: 20,
    img: "https://example.com/image.jpg",
    desc: "Standard delivery within 5-7 business days.",

}
