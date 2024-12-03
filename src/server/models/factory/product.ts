import { faker }    from '@faker-js/faker';
import { TProductDB } from "@/entity/product.model";

export const factoryProduct: TProductDB = {
  id: faker.commerce.productDescription(),
  nama: faker.commerce.product(),
  harga: faker.datatype.number( 10 ),
  lokasi: faker.image.business(),
  jenis: faker.helpers.shuffle( [ 'Semarang', 'Ungaran' ] )[ 0 ]!,
  jumlah: faker.datatype.number( 10 ),
  img: faker.image.food( 100, 100 ),
  keterangan: faker.commerce.productDescription(),
  created_at:new Date(),
  updated_at:new Date(),
}