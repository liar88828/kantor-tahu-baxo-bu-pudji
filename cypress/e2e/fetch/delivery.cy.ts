import { TCREATEDELIVER } from '@/lib/validation/zod/createZod';
import { TUPDATEDELIVER } from '@/lib/validation/zod/updateZod';

describe( 'DELIVERY spec', () => {

  describe( 'CREATE DELIVERY', () => {

    it( "POST DELIVERY", () => {
      cy.request(
        'POST',
        'http://localhost:3000/api/delivery', {
          "id"        : "test_1",
          "nama"      : "kosong",
          "hp"        : "kosong",
          "lokasi"    : "kosong",
          "jenis"     : "kosong",
          "harga"     : 0,
          "img"       : "kosong",
          "keterangan": "kosong"
        } as TCREATEDELIVER
      )
        .then( ( response ) => {
          // cy.log( response.body )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success POST' )

        } )
    } )

    it( "POST DELIVERY fail because data can't be empty", () => {
      cy.request( {
          method          : 'POST',
          url             : 'http://localhost:3000/api/delivery',
          failOnStatusCode: false,
          body            : { nama: "tahu baxo" },
        }
      )
        .then( ( response ) => {
          // cy.log( response.body )
          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'msg', 'Error POST' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'error' )
          expect( response.body ).to.have.property( 'data' )

        } )
    } )

  } )

  describe( 'FIND DELIVERY', () => {

    it( "GET DELIVERY", () => {
      cy.request( 'http://localhost:3000/api/delivery?id=all' )
        .then( ( response ) => {

          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success GET' )
        } )
    } )

    it( "GET DELIVERY by id", () => {
      cy.request( 'http://localhost:3000/api/delivery?id=test_1' )
        .then( ( response ) => {

          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success GET' )
        } )
    } )

    it( "GET DELIVERY be error because empty id", () => {
      cy.request( {
        method          : 'GET',
        url             : 'http://localhost:3000/api/delivery?id=',
        failOnStatusCode: false,
      } )
        .then( ( response ) => {

          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'msg', 'Error GET' )
        } )
    } )

  } )

  describe( 'EDIT DELIVERY', () => {
    it( "UPDATE DELIVERY", () => {
      cy.request(
        'PUT',
        'http://localhost:3000/api/delivery?id=test_1', {
          "id"        : "test_1",
          "nama"      : "kosong",
          "hp"        : "kosong",
          "lokasi"    : "kosong",
          "jenis"     : "kosong",
          "harga"     : 0,
          "img"       : "kosong",
          "keterangan": "kosong"
        } as TUPDATEDELIVER
      )
        .then( ( response ) => {

          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'success' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success PUT' )
        } )
    } )

    it( "EDIT DELIVERY fail because data can't be empty", () => {
      cy.request(
        {
          method          : 'PUT',
          url             : 'http://localhost:3000/api/delivery?id=test_1',
          failOnStatusCode: false,
          body            : { nama: "tahu baxo" },
        }
      )
        .then( ( response ) => {
          // cy.log( response.body )
          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'msg', 'Error PUT' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'error' )
          expect( response.body ).to.have.property( 'data' )

        } )
    } )

    it( "EDIT DELIVERY fail because data can't be empty id", () => {
      cy.request(
        {
          method          : 'PUT',
          url             : 'http://localhost:3000/api/delivery?id=',
          failOnStatusCode: false,
          body            : { nama: "tahu baxo" },
        }
      )
        .then( ( response ) => {

          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'msg', 'Error PUT' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'error' )
          expect( response.body ).to.have.property( 'data' )

        } )
    } )
  } )

  describe( 'DELETE DELIVERY', () => {

    it( "DELETE DELIVERY", () => {
      cy.request(
        'DELETE',
        'http://localhost:3000/api/delivery?id=test_1',
      )
        .then( ( response ) => {

          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'success' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success DELETE' )

        } )
    } )

    it( "DELETE DELIVERY error because data can't be empty id", () => {
      cy.request(
        {
          method          : 'DELETE',
          url             : 'http://localhost:3000/api/delivery?id=',
          failOnStatusCode: false,
        }
      )
        .then( ( response ) => {

          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'success' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'msg', 'Error DELETE' )

        } )
    } )

  } )

} )
