import { TCREATEPRODUCT } from '@/lib/validation/zod/createZod';

describe( 'PRODUCT spec', () => {

  describe( 'CREATE Product', () => {

    it( "POST Product", () => {
      cy.request(
        'POST',
        'http://localhost:3000/api/product', {
          "id"        : `test_1`,
          "harga"     : 20000,
          "img"       : "tidak ada",
          "jenis"     : "orderan",
          "jumlah"    : 86,
          "keterangan": "Pedas",
          "lokasi"    : "Semarang",
          "nama"      : "tahu baxo"
        } as TCREATEPRODUCT
      )
        .then( ( response ) => {
          // cy.log( response.body )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success POST' )

        } )
    } )

    it( "POST Product fail because data can't be empty", () => {
      cy.request( {
          method          : 'POST',
          url             : 'http://localhost:3000/api/product',
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

  describe( 'FIND Product', () => {

    it( "GET Product", () => {
      cy.request( 'http://localhost:3000/api/product?id=all' )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success GET' )
        } )
    } )

    it( "GET Product by id", () => {
      cy.request( 'http://localhost:3000/api/product?id=test_1' )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success GET' )
        } )
    } )

    it( "GET Product be error because empty id", () => {
      cy.request( {
        method          : 'GET',
        url             : 'http://localhost:3000/api/product?id=',
        failOnStatusCode: false,
      } )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'msg' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'msg', 'Error GET' )
        } )
    } )

  } )

  describe( 'EDIT Product', () => {
    it( "UPDATE Product", () => {
      cy.request(
        'PUT',
        'http://localhost:3000/api/product?id=test_1', {
          "harga"     : 20000,
          "img"       : "tidak ada ",
          "jenis"     : "orderan",
          "jumlah"    : 86,
          "keterangan": "Pedas",
          "lokasi"    : "Semarang",
          "nama"      : "tahu baxo update"
        }
      )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'success' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success PUT' )
        } )
    } )

    it( "EDIT Product fail because data can't be empty", () => {
      cy.request(
        {
          method          : 'PUT',
          url             : 'http://localhost:3000/api/product?id=test_1',
          failOnStatusCode: false,
          body            : { nama: "tahu baxo" },
        }
      )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'msg', 'Error PUT' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'error' )
          expect( response.body ).to.have.property( 'data' )

        } )
    } )

    it( "EDIT Product fail because data can't be empty id", () => {
      cy.request(
        {
          method          : 'PUT',
          url             : 'http://localhost:3000/api/product?id=',
          failOnStatusCode: false,
          body            : { nama: "tahu baxo" },
        }
      )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'msg', 'Error PUT' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'error' )
          expect( response.body ).to.have.property( 'data' )

        } )
    } )
  } )

  describe( 'DELETE PRODUCTS', () => {

    it( "DELETE Product", () => {
      cy.request(
        'DELETE',
        'http://localhost:3000/api/product?id=test_1',
      )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 200 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'success' )
          expect( response.body ).to.have.deep.property( 'success', true )
          expect( response.body ).to.have.property( 'msg', 'Success DELETE' )

        } )
    } )

    it( "DELETE Product error because data can't be empty id", () => {
      cy.request(
        {
          method          : 'DELETE',
          url             : 'http://localhost:3000/api/product?id=',
          failOnStatusCode: false,
        }
      )
        .then( ( response ) => {
          cy.log( response.body )
          expect( response.status ).to.eq( 400 )
          expect( response.body ).to.have.property( 'data' )
          expect( response.body ).to.have.property( 'success' )
          expect( response.body ).to.have.deep.property( 'success', false )
          expect( response.body ).to.have.property( 'msg', 'Error DELETE' )

        } )
    } )

  } )

} )
