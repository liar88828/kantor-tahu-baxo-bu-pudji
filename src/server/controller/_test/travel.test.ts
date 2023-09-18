import { exampleTravel } from '@/app/utils/ress/ErrorData';
import { describe, expect, test } from 'vitest';
import { prisma, TPTravel } from '@/server/models/prisma/config';

import IANewController from '@/interface/controller/IANewController';
import TravelController2 from '@/server/controller/Travel';
import ValidationService from '@/lib/validation/zod/validationService';
import ValidationSchema from '@/lib/validation/zod/validationSchema';
import RepoTravel from '@/server/repository/Travel';

type TYPE = TPTravel
//
const c: IANewController<"travel", TYPE> = new TravelController2(
  new RepoTravel( prisma.travel ),
  new ValidationService( new ValidationSchema().TravelSchema ),
)

// const data: Required<TYPE> = exampleTravel as Required<TYPE>

const nama          = "travelExample"
const ExampleTravel = structuredClone( exampleTravel ) as Required<TYPE>
const id            = "test1".repeat( 5 )
ExampleTravel.img   = "kosong"

describe( `${ nama } test controller `, () => {

  describe( `${ nama } test POST / CREATE `, () => {

    test( `${ nama } controller success`, async () => {
      const data   = structuredClone( ExampleTravel )
      data.id      = id
      const tests  = c.create( data )
      const result = expect( tests ).resolves
      //
      await result.toMatchObject( data )
      await result.toHaveProperty( "jenis", )
      await result.toHaveProperty( "jenis", "kosong" )
      await result.not.toHaveProperty( "salah", )
    } )

    test( `${ nama } controller error by empty key`, async () => {
      // @ts-ignore
      const tests  = c.create( {} )
      const result = expect( tests ).resolves
      //
      await result.toMatchObject( {} )
      await result.not.toHaveProperty( "jenis", "kosong" )
      await result.not.toHaveProperty( "salah", )
    } )

    test( `${ nama } controller Bank error By Id`, async () => {
      const data   = structuredClone( ExampleTravel )
      data.id      = "error"
      const tests  = c.create( data )
      const result = expect( tests ).resolves
      //
      await result.toHaveLength( 1 ) //[toMatchObject(ExampleTravel )]
      await result.not.toMatchObject( ExampleTravel )
      await result.not.toHaveProperty( "id", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_small" )
    } )

    test( `${ nama } controller Bank error empty value`, async () => {
      const data   = structuredClone( ExampleTravel )
      data.nama    = ""
      const tests  = c.create( data )
      const result = expect( tests ).resolves
      //
      await result.not.toMatchObject( ExampleTravel )
      await result.not.toHaveProperty( "id", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_big" )

      await result.not.toHaveProperty( "nama", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_small" )
    } )

  } )

  describe( `${ nama } test GET / find `, () => {

    test( `${ nama } GET controller success all data`, async () => {
      const tests  = c.find()
      const result = expect( tests ).resolves
      //
      await result.not.toHaveProperty( "jenis", "kosong" )
      await result.not.toHaveProperty( "salah", )
    } )

    test( `${ nama } GET controller success find by ID`, async () => {
      const tests  = c.findById( id )
      const result = expect( tests ).resolves
      //
      await result.toHaveProperty( "jenis", "kosong" )
      await result.not.toHaveProperty( "salah", )
    } )

    test( `${ nama } GET controller must be error by false id length`, async () => {
      const tests  = c.findById( "salah" )
      const result = expect( tests ).resolves
      //
      await result.not.toMatchObject( ExampleTravel )
      await result.not.toHaveProperty( "jenis", )
      await result.not.toContain( "code" )
    } )

    test( `${ nama } GET controller must be error by empty ID `, async () => {
      const tests  = c.findById( "" )
      const result = expect( tests ).resolves
      //
      await result.not.toMatchObject( ExampleTravel )
      await result.not.toHaveProperty( "hp", )
      await result.not.toContain( "code" )
    } )

  } )

  describe( `${ nama } test PUT / EDIT `, () => {

    test( `${ nama } PUT controller Bank success`, async () => {
      const data   = structuredClone( ExampleTravel )
      data.id      = id
      data.nama    = "update 1x"
      const tests  = c.edit( data, id )
      const result = expect( tests ).resolves
      //
      await result.toMatchObject( data )
      await result.toHaveProperty( "jenis", )
      await result.toHaveProperty( "nama", "update 1x" )
      await result.not.toHaveProperty( "salah", )
    } )

    test( `${ nama } PUT controller error By Id`, async () => {
      const tests  = c.edit( ExampleTravel, "salah" )
      const result = expect( tests ).resolves
      //
      // await result.toHaveLength( 1 )
      await result.toHaveLength( 1 )
    } )

    //error
    test( `${ nama } PUT controller Bank error empty id`, async () => {
      const tests  = c.edit( ExampleTravel, "" )
      const result = expect( tests ).resolves
      //
      await result.toHaveLength( 1 )
    } )

    test( `${ nama } PUT controller error by values`, async () => {
      ExampleTravel.jenis = "1"
      // @ts-ignore
      ExampleTravel.nama  = 1 as number
      const tests         = c.edit( ExampleTravel, id )
      await expect( tests ).resolves.toHaveLength( 2 )
    } )
  } )

  describe( `${ nama } test DELETE  `, () => {

    test( `${ nama } DELETE controller Bank success`, async () => {
      const tests  = c.destroy( id )
      const result = expect( tests ).resolves
      //
      await result.toMatchObject( tests )
      await result.toHaveProperty( "jenis", )
      await result.toHaveProperty( "nama", "update 1x" )
      await result.toHaveProperty( "jenis", "kosong" )
      await result.not.toHaveProperty( "salah", )
    } )

    test( `${ nama } DELETE controller  error By Id`, async () => {
      const tests  = c.destroy( "salah" )
      const result = expect( tests ).resolves
      //
      await result.toHaveLength( 1 )

    } )

    test( `${ nama } DELETE controller Bank error by empty`, async () => {
      const tests  = c.destroy( "" )
      const result = expect( tests ).resolves
      //
      await result.toHaveLength( 1 )
    } )

  } )
} )