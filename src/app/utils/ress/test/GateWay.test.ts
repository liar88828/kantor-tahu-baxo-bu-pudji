import { describe, expect, it } from 'vitest';
import { exampleBank } from '@/app/utils/ress/ErrorData';
import { GateWay } from '@/app/utils/ress/GateWay';
import { statusTest } from '@/app/utils/test/statusTest';

const json = structuredClone( exampleBank )
json.id    = json.id.repeat( 4 ) + "setId"
describe( 'test GateWay', () => {

  it( "first create data bank first ", async () => {
    const data = GateWay( "POST", "bank", "", json )
    await expect( data ).resolves.toContain( statusTest( "POST" ) )
  } )

  it( 'should be objected GateWay', async () => {
    const test = GateWay( 'GET', 'bank', json.id, "only" )
    await expect( test ).resolves.toMatchObject( {
      "hp"        : "kosong",
      "id"        : "kosongkosongkosongkosongsetId",
      "jenis"     : "kosong",
      "keterangan": "kosong",
      "lokasi"    : "kosong",
      "nama"      : "kosong",
      "no"        : "kosong",
    } )
  } );

  it( "Can delete by id banks", async () => {
    const data = GateWay( "DELETE", "bank", json.id, )
    await expect( data ).resolves.toContain( statusTest( "DELETE" ) )
  } )
} );
