import { TCREATEBANK } from '@/lib/validation/zod/createZod';
import { TUPDATEBANK } from '@/lib/validation/zod/updateZod';

describe( 'BANK spec', () => {

  describe( 'CREATE Bank', () => {

    it( "POST Bank", () => {
      cy.request(
        'POST',
        'http://localhost:3000/api/bank', {
          "id"        : "test_1",
          "hp"        : "test1",
          "no"        : "asdasdas",
          "nama"      : "mandiri",
          "lokasi"    : "Semrang",
          "keterangan": "orak jelas",
          "img"       : "https://logowik.com/content/uploads/images/cash2548.jpg",
          "jenis"     : "Kredit"
        } as TCREATEBANK
      )
        .then( ( response ) => {
          // cy.log( response.body )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success POST' )

        } )
    } )

    it( "POST Bank fail because data can't be empty", () => {
      cy.request( {
          method          : 'POST',
          url             : 'http://localhost:3000/api/bank',
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

  describe( 'FIND Bank', () => {

    it( "GET Bank", () => {
      cy.request( 'http://localhost:3000/api/bank?id=all' )
        .then( ( response ) => {

          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success GET' )
        } )
    } )

    it( "GET Bank by id", () => {
      cy.request( 'http://localhost:3000/api/bank?id=test_1' )
        .then( ( response ) => {

          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success GET' )
        } )
    } )

    it( "GET Bank be error because empty id", () => {
      cy.request( {
        method          : 'GET',
        url             : 'http://localhost:3000/api/bank?id=',
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

  describe( 'EDIT Bank', () => {
    it( "UPDATE Bank", () => {
      cy.request(
        'PUT',
        'http://localhost:3000/api/bank?id=test_1', {
          "id"        : "test_1",
          "hp"        : "test1",
          "no"        : "asdasdas",
          "nama"      : "mandiri",
          "lokasi"    : "Semrang",
          "keterangan": "orak jelas",
          "img"       : "https://logowik.com/content/uploads/images/cash2548.jpg",
          "jenis"     : "Kredit"
        } as TUPDATEBANK
      )
        .then( ( response ) => {

          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'success' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success PUT' )
        } )
    } )

    it( "EDIT Bank fail because data can't be empty", () => {
      cy.request(
        {
          method          : 'PUT',
          url             : 'http://localhost:3000/api/bank?id=test_1',
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

    it( "EDIT Bank fail because data can't be empty id", () => {
      cy.request(
        {
          method          : 'PUT',
          url             : 'http://localhost:3000/api/bank?id=',
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

  describe( 'DELETE Bank', () => {

    it( "DELETE Bank", () => {
      cy.request(
        'DELETE',
        'http://localhost:3000/api/bank?id=test_1',
      )
        .then( ( response ) => {

          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'success' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success DELETE' )

        } )
    } )

    it( "DELETE Bank error because data can't be empty id", () => {
      cy.request(
        {
          method          : 'DELETE',
          url             : 'http://localhost:3000/api/bank?id=',
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
