import { describe, expect, test } from 'vitest';
import { addDot, getExtensionData, validateExtension } from '@/lib/utils/fileExtension';
import { errorDataZod } from '@/lib/utils/errorResponse';

describe( "test file extension", () => {

  describe( "test file add a dot .", () => {
    test( "should be add a dot . because file jpeg", () => {
      const test = addDot( "image", "jpeg" )
      // Rp 2.000,00
      expect( test ).toBe( "image.jpeg" )
    } )

    test( "should be add a dot . because file jpg", () => {
      const test = addDot( "image", ".jpg" )
      // Rp 2.000,00
      expect( test ).toBe( "image.jpg" )
    } )

    test( "should be add a dot . because file webp", () => {
      const test = addDot( "image", "webp" )
      // Rp 2.000,00
      expect( test ).toBe( "image.webp" )
    } )

    test( "should be add a dot . must be error", () => {
      const test = addDot( undefined, undefined )
      expect( test ).toMatchObject( errorDataZod( { name: undefined, extension: undefined } ) )
    } )
  } )

  describe( "test file slice and get a extension", () => {
    test( "should be slice and get a extension", () => {
      const test = getExtensionData( "image.jpg" )
      // Rp 2.000,00
      expect( test ).toBe( ".jpg" )
    } )

    test( "should be error a slice ", () => {
      const test = getExtensionData( "" )
      expect( test ).toMatchObject( errorDataZod( { name: "" } ) )

    } )
  } )

  describe( "test extensions", () => {
    test( "should be get extensions", () => {
      const test = validateExtension( ".jpg" )
      // Rp 2.000,00
      expect( test ).toBe( true )
      expect( test ).toBeTruthy()
    } )

    test( "should be get error extension not available", () => {
      const test = validateExtension( "test.pdf" )
      expect( test ).toBeFalsy()
      expect( test ).toBe( false )
    } )

    test( "should be get error because undefined", () => {
      const test = validateExtension( undefined )
      expect( test ).toMatchObject( errorDataZod( { extension: undefined } ) )
    } )
  } )
} )
