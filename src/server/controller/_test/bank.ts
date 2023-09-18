// import { describe, expect, test } from 'vitest';
// import { prisma } from '@/server/models/prisma/config';
// import BankController from '@/server/controller/Bank';
// import RepoBank from '@/server/repository/Bank';
// import Validation from '@/lib/validation/schema';
// import Service from '@/lib/validation/validation';
//
// import { IControlBank } from '@/interface/controller/Bank';
//
// const c: IControlBank = new BankController(
//   new RepoBank( prisma.bank ),
//   new Validation(),
//   new Service()
// )
//
// export const dataExampleBank = {
//   "hp"        : "022342342",
//   "id"        : "CA_09_Un_Kr_Bi_1693368262048",
//   "img"       : "https://logowik.com/content/uploads/images/cash2548.jpg",
//   "jenis"     : "Kredit",
//   "keterangan": "Bisa Di cicil",
//   "lokasi"    : "Ungaran",
//   "nama"      : "CASH",
//   "no"        : "0234234343",
// }
//
// describe.skip( "Bank test controller ", () => {
//
//   describe( "Bank test GET / find ", () => {
//     test( "Bank GET controller success", async () => {
//       const tests  = c.findById( "CA_09_Un_Kr_Bi_1693368262048" )
//       const result = expect( tests ).resolves
//       await result.toMatchObject( dataExampleBank )
//       await result.toHaveProperty( "hp", )
//       await result.toHaveProperty( "hp", "022342342" )
//       await result.not.toHaveProperty( "hp", "salah" )
//       await result.not.toHaveProperty( "salah", )
//     } )
//
//     test( "Bank GET controller must be error", async () => {
//       const tests  = c.findById( "CA_09_Uns" )
//       const result = expect( tests ).resolves
//       await result.not.toMatchObject( dataExampleBank )
//       await result.not.toHaveProperty( "hp", )
//       await result.not.toContain( "code" )
//     } )
//   } )
//
//   describe( "Bank test POST / CREATE ", () => {
//
//     test( "controller Bank success", async () => {
//       dataExampleBank.id      = "CA_09_Un_Kr_Bi_1693368262010"
//       dataExampleBank.nama    = "test 1"
//       const tests  = c.create( dataExampleBank )
//       const result = expect( tests ).resolves
//       await result.toMatchObject( dataExampleBank )
//       await result.toHaveProperty( "hp", )
//       await result.toHaveProperty( "hp", "022342342" )
//       await result.not.toHaveProperty( "hp", "salah" )
//       await result.not.toHaveProperty( "salah", )
//     } )
//
//     test( "controller Bank error By Id", async () => {
//       dataExampleBank.id      = ""
//       dataExampleBank.nama    = "test 1"
//       const tests  = c.create( dataExampleBank )
//       const result = expect( tests ).resolves
//       await result.not.toMatchObject( dataExampleBank )
//       await result.not.toHaveProperty( "id", )
//       await result.not.toContain( "code" )
//       await result.not.toContain( "too_small" )
//     } )
//
//     test( "controller Bank error", async () => {
//       dataExampleBank.id      = "CA_09_Un_Kr_Bi_1693368262010_error"
//       dataExampleBank.nama    = ""
//       const tests  = c.create( dataExampleBank )
//       const result = expect( tests ).resolves
//       await result.not.toMatchObject( dataExampleBank )
//       await result.not.toHaveProperty( "id", )
//       await result.not.toContain( "code" )
//       await result.not.toContain( "too_big" )
//
//       await result.not.toHaveProperty( "nama", )
//       await result.not.toContain( "code" )
//       await result.not.toContain( "too_small" )
//     } )
//
//   } )
//
//   describe( "Bank test PUT / EDIT ", () => {
//
//     test( "Bank PUT controller Bank success", async () => {
//       dataExampleBank.id      = "CA_09_Un_Kr_Bi_1693368262010"
//       dataExampleBank.nama    = "update 1x"
//       const tests  = c.edit( dataExampleBank, dataExampleBank.id )
//       const result = expect( tests ).resolves
//       await result.toMatchObject( dataExampleBank )
//       await result.toHaveProperty( "hp", )
//       await result.toHaveProperty( "nama", "update 1x" )
//       await result.toHaveProperty( "hp", "022342342" )
//       await result.not.toHaveProperty( "hp", "salah" )
//       await result.not.toHaveProperty( "salah", )
//     } )
//
//     test( "Bank PUT controller  error By Id", async () => {
//       dataExampleBank.id      = ""
//       dataExampleBank.nama    = "test 1"
//       const tests  = c.create( dataExampleBank )
//       const result = expect( tests ).resolves
//       await result.not.toMatchObject( dataExampleBank )
//       await result.not.toHaveProperty( "id", )
//       await result.not.toContain( "code" )
//       await result.not.toContain( "too_small" )
//     } )
//
//     test( "Bank PUT controller Bank error", async () => {
//       dataExampleBank.id      = "CA_09_Un_Kr_Bi_1693368262010_error"
//       dataExampleBank.nama    = ""
//       const tests  = c.create( dataExampleBank )
//       const result = expect( tests ).resolves
//       await result.not.toMatchObject( dataExampleBank )
//       await result.not.toHaveProperty( "id", )
//       await result.not.toContain( "code" )
//       await result.not.toContain( "too_big" )
//
//       await result.not.toHaveProperty( "nama", )
//       await result.not.toContain( "code" )
//       await result.not.toContain( "too_small" )
//     } )
//
//   } )
//
//   describe( "Bank test DELETE  ", () => {
//
//     test( "Bank DELETE controller Bank success", async () => {
//       dataExampleBank.id      = "CA_09_Un_Kr_Bi_1693368262010"
//       dataExampleBank.nama    = "update 1x"
//       const tests  = c.destroy(   dataExampleBank.id )
//       const result = expect( tests ).resolves
//       await result.toMatchObject( dataExampleBank )
//       await result.toHaveProperty( "hp", )
//       await result.toHaveProperty( "nama", "update 1x" )
//       await result.toHaveProperty( "hp", "022342342" )
//       await result.not.toHaveProperty( "hp", "salah" )
//       await result.not.toHaveProperty( "salah", )
//     } )
//
//     test( "Bank DELETE controller  error By Id", async () => {
//       dataExampleBank.id      = ""
//       dataExampleBank.nama    = "test 1"
//       const tests  = c.create( dataExampleBank )
//       const result = expect( tests ).resolves
//       await result.not.toMatchObject( dataExampleBank )
//       await result.not.toHaveProperty( "id", )
//       await result.not.toContain( "code" )
//       await result.not.toContain( "too_small" )
//     } )
//
//     test( "Bank DELETE controller Bank error", async () => {
//       dataExampleBank.id      = "CA_09_Un_Kr_Bi_1693368262010_error"
//       dataExampleBank.nama    = ""
//       const tests  = c.create( dataExampleBank )
//       const result = expect( tests ).resolves
//       await result.not.toMatchObject( dataExampleBank )
//       await result.not.toHaveProperty( "id", )
//       await result.not.toContain( "code" )
//       await result.not.toContain( "too_big" )
//       await result.not.toHaveProperty( "nama", )
//       await result.not.toContain( "code" )
//       await result.not.toContain( "too_small" )
//     } )
//
//   } )
// } )