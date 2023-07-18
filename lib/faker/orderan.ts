import { faker } from '@faker-js/faker';
import times from 'lodash.times';
import { TOrder } from '../../entity/orderan';

faker.seed( 14 )

export function newPerson(): TOrder[] {

  return times( 12, () => ( {
      // waktu

      tanggal: {
        pesan: faker.date.birthdate(),
        kirim: faker.date.future( 10 ),
        waktuKirim: faker.datatype.datetime(),
      },

      // data orang
      orang: {
        pengirim: faker.name.lastName(),
        hpPengirim: faker.phone.number().toString(),
        penerima: faker.name.firstName(),
        alamatPenerima: faker.address.city(),
        hpPenerima: faker.phone.number().toString(),
      },

      // product
      Product: [
        {
          id: faker.commerce.productDescription(),
          nama: faker.commerce.product(),
          harga: faker.datatype.number( 10 ),
          jumlah: faker.datatype.number( 10 ),
          lokasi: faker.image.business(),
          jenis: faker.helpers.shuffle( [ 'Ungaran', 'Semarang' ] )[ 0 ]!,
        }
      ],
      keterangan: {
        guna: faker.lorem.paragraph( 2 ),
        lokasi: faker.address.cityName(),
      },

      // travel
      travel: {
        namaPengiriman: faker.company.name(),
        ekspedisi: faker.address.city(),
        ongkir: faker.datatype.number( 10 ),
      },
      total: {

        no: faker.datatype.number( 100 ).toString(),
        pembayaran: faker.music.genre(),
        total: faker.datatype.number( 100 ),
        totalBayar: faker.datatype.number( 100 ),
        totalPenjualan: faker.datatype.number( 100 ),
        status: faker.helpers.shuffle<TOrder['total']['status']>( [ 'Di terima', 'Proses', 'Kirim', "Selesai" ] )[ 0 ]!,
      }
    } )
  )
}
