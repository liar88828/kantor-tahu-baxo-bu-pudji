import { faker } from '@faker-js/faker'
import times from 'lodash.times'

export type TOrder = {
  // waktu
  pesan: Date | string
  kirim: Date | string
  waktuKirim: Date | string

  // data orang
  pengirim: string
  hp_pengirim: string
  penerima: string
  alamat_penerima: string
  hp_penerima: string
// Product
  orderan: string
  harga_orderan: number
  jumlah_orderan: number

  item: string
  harga_item: number
  jumlah_item: number
//keterangan
  ekspedisi: string
  ongkir: number
  pembayaran: string
  lokasi: string
  keterangan: string
  status: 'Di terima' | 'Proses' | 'Kirim' | "Selesai"
}
export type TOrderTotal = {
  no: number
  // total_bayar: number
} & TOrder

faker.seed( 14 )

function newPerson(): TOrderTotal[] {

  return times( 12, () => ( {
      no: faker.datatype.number( 100 ),
      // waktu
      pesan: faker.date.birthdate(),
      kirim: faker.date.future( 10 ),
      waktuKirim: faker.datatype.datetime(),

      // keterangan orang
      pengirim: faker.name.lastName(),
      hp_pengirim: faker.phone.number(),
      penerima: faker.name.firstName(),
      alamat_penerima: faker.address.city(),
      hp_penerima: faker.phone.number(),
      // product
      orderan: faker.commerce.product(),
      harga_orderan: faker.datatype.number( 10 ),
      jumlah_orderan: faker.datatype.number( 10 ),

      item: faker.commerce.product(),
      harga_item: faker.datatype.number( 10 ),
      jumlah_item: faker.datatype.number( 100 ),
      // travel
      ekspedisi: faker.address.city(),
      ongkir: faker.datatype.number( 10 ),
      pembayaran: faker.music.genre(),
      lokasi: faker.name.firstName() as string,

      keterangan: faker.lorem.paragraph( 2 ),
      total_bayar: faker.datatype.number( 100 ),
      status: faker.helpers.shuffle<TOrderTotal['status']>( [
        'Di terima', 'Proses', 'Kirim', "Selesai"
      ] )[ 0 ]!,
    } )
  )
}

// console.log(newPerson())
export const Person = newPerson()
// const createPeople = (n = 10) => {
// 	return Array(n).fill(newPerson())
// }
// export let fakePeople: TPeople[] = createPeople(100)
// const createUser = () => {
// 	return {
// 		name: faker.name.findName(),
// 		email: faker.internet.email(),
// 		address: faker.address.streetAddress(),
// 		bio: faker.lorem.sentence(),
// 		image: faker.image.avatar(),
// 	}
// }

// const createUsers = (numUsers = 5) => {
// 	return Array(numUsers).fill(createUser())
// }

// let fakeUsers = createUsers(5)
// console.log(fakeUsers)

// Initializing our variables with a different random data each time it is run

// Iteration
// This code runs twenty times
// It produces each time different data
// let data = []
// for (let i = 0; i < 20; i++) {
// 	var randomName = faker.name.findName() // Generates a random name
// 	var randomEmail = faker.internet.email() // Generates a random email
// 	var randomProduct = faker.commerce.productName() // Generates a random product name
// 	var randomCompany = faker.company.companyName() // Will give back a random company name
// 	var randomCard = faker.helpers.arrayElements() // It's output is a random contact card containing many properties

// 	data.push({
// 		randomName,
// 		randomEmail,
// 		randomProduct,
// 		randomCompany,
// 		randomCard,
// 	})
// }
// console.log(data)

// function createRandomUser() {
// 	return {
// 		userId: faker.datatype.uuid(),
// 		username: faker.internet.userName(),
// 		email: faker.internet.email(),
// 		avatar: faker.image.avatar(),
// 		password: faker.internet.password(),
// 		registeredAt: faker.date.past(),
// 	}
// }

// export const USERS = faker.helpers.multiple(createRandomUser, {
// 	count: 5,
// })
// console.log(USERS)

// function generateUsers() {
// 	let users = []

// 	for (let id = 1; id <= 100; id++) {
// 		let firstName = faker.name.firstName()
// 		let lastName = faker.name.lastName()

// 		let address = faker.name.gender()
// 		let email = faker.internet.email()

// 		users.push({
// 			id: id,
// 			first_name: firstName,
// 			last_name: lastName,
// 			address: address,
// 			email: email,
// 		})
// 	}

// 	return { data: users }
// }

// let dataObj = generateUsers()
