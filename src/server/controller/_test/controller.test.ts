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

const name        = "BankExample"
const ExampleBank = structuredClone( exampleBank )

describe.skip( `${ name } test controller `, () => {

  describe( `${ name } test GET / find `, () => {
    test( `${ name } GET controller success`, async () => {
      const tests  = c.findById( "CA_09_Un_Kr_Bi_1693368262048" )
      const result = expect( tests ).resolves
      await result.toMatchObject( ExampleBank )
      await result.toHaveProperty( "hp", )
      await result.toHaveProperty( "hp", "022342342" )
      await result.not.toHaveProperty( "hp", "salah" )
      await result.not.toHaveProperty( "salah", )
    } )

    test( `${ name } GET controller must be error`, async () => {
      const tests  = c.findById( "CA_09_Uns" )
      const result = expect( tests ).resolves
      await result.not.toMatchObject( ExampleBank )
      await result.not.toHaveProperty( "hp", )
      await result.not.toContain( "code" )
    } )
  } )

  describe( `${ name } test POST / CREATE `, () => {

    test( "controller Bank success", async () => {
      ExampleBank.id   = "CA_09_Un_Kr_Bi_1693368262010"
      ExampleBank.nama = "test 1"
      const tests      = c.create( ExampleBank )
      const result     = expect( tests ).resolves
      await result.toMatchObject( ExampleBank )
      await result.toHaveProperty( "hp", )
      await result.toHaveProperty( "hp", "022342342" )
      await result.not.toHaveProperty( "hp", "salah" )
      await result.not.toHaveProperty( "salah", )
    } )

    test( "controller Bank error By Id", async () => {
      ExampleBank.id   = ""
      ExampleBank.nama = "test 1"
      const tests      = c.create( ExampleBank )
      const result     = expect( tests ).resolves
      await result.not.toMatchObject( ExampleBank )
      await result.not.toHaveProperty( "id", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_small" )
    } )

    test( "controller Bank error", async () => {
      ExampleBank.id   = "CA_09_Un_Kr_Bi_1693368262010_error"
      ExampleBank.nama = ""
      const tests      = c.create( ExampleBank )
      const result     = expect( tests ).resolves
      await result.not.toMatchObject( ExampleBank )
      await result.not.toHaveProperty( "id", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_big" )

      await result.not.toHaveProperty( "nama", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_small" )
    } )

  } )

  describe( `${ name } test PUT / EDIT `, () => {

    test( `${ name } PUT controller Bank success`, async () => {
      ExampleBank.id   = "CA_09_Un_Kr_Bi_1693368262010"
      ExampleBank.nama = "update 1x"
      const tests      = c.edit( ExampleBank, ExampleBank.id )
      const result     = expect( tests ).resolves
      await result.toMatchObject( ExampleBank )
      await result.toHaveProperty( "hp", )
      await result.toHaveProperty( "nama", "update 1x" )
      await result.toHaveProperty( "hp", "022342342" )
      await result.not.toHaveProperty( "hp", "salah" )
      await result.not.toHaveProperty( "salah", )
    } )

    test( `${ name } PUT controller  error By Id`, async () => {
      ExampleBank.id   = ""
      ExampleBank.nama = "test 1"
      const tests      = c.create( ExampleBank )
      const result     = expect( tests ).resolves
      await result.not.toMatchObject( ExampleBank )
      await result.not.toHaveProperty( "id", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_small" )
    } )

    test( `${ name } PUT controller Bank error`, async () => {
      ExampleBank.id   = "CA_09_Un_Kr_Bi_1693368262010_error"
      ExampleBank.nama = ""
      const tests      = c.create( ExampleBank )
      const result     = expect( tests ).resolves
      await result.not.toMatchObject( ExampleBank )
      await result.not.toHaveProperty( "id", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_big" )

      await result.not.toHaveProperty( "nama", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_small" )
    } )

  } )

  describe( `${ name } test DELETE  `, () => {

    test( `${ name } DELETE controller Bank success`, async () => {
      ExampleBank.id   = "CA_09_Un_Kr_Bi_1693368262010"
      ExampleBank.nama = "update 1x"
      const tests      = c.destroy( ExampleBank.id )
      const result     = expect( tests ).resolves
      await result.toMatchObject( ExampleBank )
      await result.toHaveProperty( "hp", )
      await result.toHaveProperty( "nama", "update 1x" )
      await result.toHaveProperty( "hp", "022342342" )
      await result.not.toHaveProperty( "hp", "salah" )
      await result.not.toHaveProperty( "salah", )
    } )

    test( `${ name } DELETE controller  error By Id`, async () => {
      ExampleBank.id   = ""
      ExampleBank.nama = "test 1"
      const tests      = c.create( ExampleBank )
      const result     = expect( tests ).resolves
      await result.not.toMatchObject( ExampleBank )
      await result.not.toHaveProperty( "id", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_small" )
    } )

    test( `${ name } DELETE controller Bank error`, async () => {
      ExampleBank.id   = "CA_09_Un_Kr_Bi_1693368262010_error"
      ExampleBank.nama = ""
      const tests      = c.create( ExampleBank )
      const result     = expect( tests ).resolves
      await result.not.toMatchObject( ExampleBank )
      await result.not.toHaveProperty( "id", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_big" )
      await result.not.toHaveProperty( "nama", )
      await result.not.toContain( "code" )
      await result.not.toContain( "too_small" )
    } )

  } )
} )