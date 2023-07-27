import { faker } from '@faker-js/faker';
import { TOrder } from '@/entity/orderan';
import { factoryProduct } from '@/server/models/factory/product';

faker.seed( 14 )

export const factoryOrderan: TOrder =
  {
    // product
    listOrderan: [ factoryProduct ],
    listItem: [ factoryProduct ],
    semuaProduct: [ factoryProduct ],

    // waktu
    pesan: faker.date.birthdate(),
    kirim: faker.date.future( 10 ),
    waktuKirim: faker.datatype.datetime(),

    // data orang
    pengirim: faker.name.lastName(),
    hpPengirim: faker.phone.number().toString(),
    penerima: faker.name.firstName(),
    alamatPenerima: faker.address.city(),
    hpPenerima: faker.phone.number().toString(),

    guna: faker.lorem.paragraph( 2 ),
    lokasi: faker.helpers.shuffle( [ 'Ungaran', 'Semarang' ] )[ 0 ]!,

    // travel
    namaPengiriman: faker.company.name(),
    ekspedisi: faker.address.city(),
    ongkir: faker.datatype.number( 10 ),

    no: faker.datatype.number( 100 ).toString(),
    typePembayaran: faker.music.genre(),
    total: faker.datatype.number( 100 ),
    totalBayar: faker.datatype.number( 100 ),
    totalPenjualan: faker.datatype.number( 100 ),
    status: faker.helpers.shuffle<TOrder ["status"]>( [ 'Di terima', 'Proses', 'Kirim', "Selesai" ] )[ 0 ]!,
  }

