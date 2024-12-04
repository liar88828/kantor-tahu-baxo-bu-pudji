import { faker } from '@faker-js/faker';
import { TProductDB } from "@/entity/product.model";

export const factoryProduct: TProductDB = {
  id: faker.commerce.productDescription(),
  name: faker.commerce.product(),
  price: faker.datatype.number(10),
  location: faker.image.business(),
  type: faker.helpers.shuffle(['Semarang', 'Ungaran'])[0]!,
  qty: faker.datatype.number(10),
  img: faker.image.food( 100, 100 ),
  desc: faker.commerce.productDescription(),
  created_at:new Date(),
  updated_at:new Date(),
}