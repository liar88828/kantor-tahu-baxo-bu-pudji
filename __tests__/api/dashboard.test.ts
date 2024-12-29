// import { describe, expect, it } from 'vitest';
//
// import { statusTest } from '../../src/app/utils/test/statusTest';
//
// describe( "GET Dashboard", () => {
//   it( "Dashboard Can find by all ", async () => {
//     // const data = getDashboard()
//     const data = GateWay( "GET", "orderan", "all", )
//     await expect( data ).resolves.toContain( statusTest( "GET" ) )
//   } )
//
//   it( "Dashboard Can find ID ", async () => {
//     const data = GateWay( "GET", "orderan", "semua", "", "table" )
//     await expect( data ).resolves.toContain( statusTest( "GET" ) )
//   } )
//
//   it( "Dashboard Can find ID ", async () => {
//     const data = GateWay( "GET", "orderan", "di dikirim", "", "table" )
//     await expect( data ).resolves.toContain( statusTest( "GET" ) )
//   } )
//
//   it( "Dashboard Cannot find wrong ID ", async () => {
//     const data = GateWay( "GET", "orderan", "salah", )
//     await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
//   } )
//
//   it( "Dashboard Cannot find empty ID ", async () => {
//     const data = GateWay( "GET", "orderan", "", )
//     await expect( data ).resolves.not.toContain( statusTest( "GET" ) )
//   } )
// } )
