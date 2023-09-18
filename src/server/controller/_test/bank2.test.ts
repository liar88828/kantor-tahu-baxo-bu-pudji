import { describe, expect, test } from 'vitest';
import { prisma, TPBank } from '@/server/models/prisma/config';

import RepoBank from '@/server/repository/Bank';
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';
import BankController2 from '@/server/controller/Bank';
import IANewController from '@/interface/controller/IANewController';
import { exampleBank } from '@/app/utils/ress/ErrorData';

type TYPE = TPBank;
const c: IANewController<"bank", TYPE> = new BankController2(
  new RepoBank( prisma.bank ),
  new ValidationService<TYPE>( new ValidationSchema().BankSchema ),
)

const dataBank    = structuredClone( exampleBank )
dataBank.id       = "test".repeat( 5 )
const id          = "test".repeat( 5 )
const name        = "BankExample2"
const ExampleBank = dataBank

describe( `${ name } test controller `, () => {

  describe( `${ name } test POST / CREATE `, () => {

    test( `${ name } controller success`, async () => {
      const data   = structuredClone( exampleBank )
      data.id      = id
      const tests  = c.create( data )
      const result = expect( tests ).resolves
      //
      await result.toMatchObject( data )
      await result.toHaveProperty( "hp", )
      await result.toHaveProperty( "hp", "kosong" )
      await result.not.toHaveProperty( "hp", "salah" )
      await result.not.toHaveProperty( "salah", )
    } )

    test( `${ name } controller Bank error By Id`, async () => {
      const data = structuredClone( ExampleBank )
      data.id    = ""

      const tests  = c.create( data )
      const result = expect( tests ).resolves
      //
      await result.toHaveLength( 1 ) //[toMatchObject( ExampleBank )]
      await result.not.toMatchObject( ExampleBank )
      await result.not.toHaveProperty( "id", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_small" )
    } )

    test( `${ name } controller Bank error`, async () => {
      const data   = structuredClone( ExampleBank )
      data.nama    = ""
      const tests  = c.create( data )
      const result = expect( tests ).resolves
      //
      await result.not.toMatchObject( ExampleBank )
      await result.not.toHaveProperty( "id", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_big" )

      await result.not.toHaveProperty( "nama", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_small" )
    } )

  } )

  describe( `${ name } test GET / find `, () => {

    test( `${ name } GET controller success all data`, async () => {
      const tests  = c.find()
      const result = expect( tests ).resolves
      //
      await result.not.toHaveProperty( "hp", "salah" )
      await result.not.toHaveProperty( "salah", )
    } )

    test( `${ name } GET controller success`, async () => {
      const data   = structuredClone( ExampleBank )
      data.id      = id
      const tests  = c.findById( id )
      const result = expect( tests ).resolves
      //

      await result.toMatchObject( data )
      await result.toHaveProperty( "hp", )
      await result.toHaveProperty( "hp", "kosong" )
      await result.not.toHaveProperty( "hp", "salah" )
      await result.not.toHaveProperty( "salah", )
    } )

    test( `${ name } GET controller must be error`, async () => {
      const tests  = c.findById( "salah" )
      const result = expect( tests ).resolves
      await result.toHaveLength( 1 )

    } )
  } )

  describe( `${ name } test PUT / EDIT `, () => {

    test( `${ name } PUT controller Bank success`, async () => {
      const data   = structuredClone( ExampleBank )
      data.nama    = "update 1x"
      const tests  = c.edit( data, data.id )
      const result = expect( tests ).resolves
      //
      await result.toMatchObject( data )
      await result.toHaveProperty( "hp", )
      await result.toHaveProperty( "nama", "update 1x" )
      await result.toHaveProperty( "hp", "kosong" )
      await result.not.toHaveProperty( "hp", "salah" )
      await result.not.toHaveProperty( "salah", )
    } )

    test( `${ name } PUT controller error By Id`, async () => {
      const tests  = c.edit( ExampleBank, "salah" )
      const result = expect( tests ).resolves
      await result.toHaveLength( 1 )
    } )

    //error
    test( `${ name } PUT controller Bank error empty id`, async () => {
      const tests  = c.edit( ExampleBank, "" )
      const result = expect( tests ).resolves
      //
      await result.toHaveLength( 1 )
    } )

    test( `${ name } PUT controller error by wrong values`, async () => {
      const data     = structuredClone( ExampleBank )
      data.hp        = "1"
      // @ts-ignore
      data.nama      = 1 as number
      const tests    = c.edit( data, data.id )
      const response = expect( tests ).resolves
      await response.toHaveLength( 2 )

    } )

    test( `${ name } PUT controller error by wrong empty`, async () => {
      const data     = structuredClone( ExampleBank )
      data.hp        = "1"
      // @ts-ignore
      data.nama      = 1 as number
      // @ts-ignore
      const tests    = c.edit( {}, id )
      const response = expect( tests ).resolves
      await response.toHaveLength( 7 )

    } )

    test( `${ name } PUT controller error by Partial Key`, async () => {
      const { keterangan, img, ...ress } = structuredClone( ExampleBank )
      ress.hp                            = "1"
      // @ts-ignore
      ress.nama                          = 1 as number
      // @ts-ignore
      const tests                        = c.edit( ress, id )
      const response                     = expect( tests ).resolves
      await response.toHaveLength( 4 )

    } )

  } )

  describe( `${ name } test DELETE  `, () => {

    test( `${ name } DELETE controller Bank success`, async () => {
      const data   = structuredClone( ExampleBank )
      data.nama    = "update 1x"
      const tests  = c.destroy( data.id )
      const result = expect( tests ).resolves
      //
      await result.toMatchObject( data )
      await result.toHaveProperty( "hp", )
      await result.toHaveProperty( "nama", "update 1x" )
      await result.toHaveProperty( "hp", "kosong" )
      await result.not.toHaveProperty( "hp", "salah" )
      // await result.not.toHaveProperty( "salah", )
    } )

    test( `${ name } DELETE controller  error By Id`, async () => {
      const tests  = c.destroy( "salah" )
      const result = expect( tests ).resolves
      //
      await result.not.toMatchObject( ExampleBank )

    } )

    test( `${ name } DELETE controller Bank error by empty`, async () => {

      const tests  = c.destroy( "" )
      const result = expect( tests ).resolves
      //
      // await result.not.toMatchObject( ExampleBank )
      await result.toHaveLength( 1 )

    } )

  } )
} )