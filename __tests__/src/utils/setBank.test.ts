import { describe, expect, it } from 'vitest';
import { getId, setBank } from '../../../src/lib/ress/setBank';
import { exampleBank } from '../../../src/lib/ress/ErrorData';
import { GateWay } from '../../../src/lib/ress/GateWay';
import { statusTest } from './statusTest';

const json = structuredClone( exampleBank )
json.id    = json.id.repeat( 4 ) + "asda"
describe( 'test setBank', () => {

  it( 'should be objected setBank', () => {
    const { img, ...ress } = exampleBank
    const test             = setBank( exampleBank )
    expect( test ).toEqual( ress )
  } );

  it( "Can create a post data setBank ", async () => {
    const data = GateWay( "POST", "bank", "", json )
    await expect( data ).resolves.toContain( statusTest( "POST" ) )
  } )

  it( 'Can get by Id setBank', async () => {
    const test = getId( "bank", json.id, )
    await expect( test ).resolves.toHaveProperty( "nama", "kosong" )
  } );

  it( 'error because empty model', async () => {
    // @ts-ignore
    const test = getId( "", json.id, )
    await expect( test ).resolves.not.toHaveProperty( "nama", "kosong" )
    await expect( test ).resolves.toBe( "require" )
  } );

  it( "Can delete by id setBank", async () => {
    const data = GateWay( "DELETE", "bank", json.id, )
    await expect( data ).resolves.toContain( statusTest( "DELETE" ) )
  } )
} );
