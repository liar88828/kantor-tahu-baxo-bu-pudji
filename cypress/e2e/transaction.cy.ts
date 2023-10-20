import { formProduct } from '../../asset/constants/model/product';

describe( 'template spec', () => {
  beforeEach( () => {
    cy.visit( '/orderan/list' )
  } )

  it( "move links", () => {
    cy.get( '[data-test="link-create"]' ).click()
    cy.url().should( 'include', '/orderan/create' )

    cy.get( '[data-test="link-list"]' ).click()
    cy.url().should( 'include', '/table/Di Terima' )
  } )

  it.skip( "create form", () => {
    cy.get( `[data-test="list-orderan"]` ).then( ( $el ) => {
        cy.wait( 1000 )
        if( $el.text().includes( "update orderan" ) ) {
          cy.get( `[data-test="delete-update orderan"]` ).click()
          cy.wait( 1000 )
        }
        else if( $el.text().includes( "orderan" ) ) {
          cy.get( `[data-test="delete-product baru"]` ).click()
          cy.wait( 1000 )
        }
        else {
          // create again
          cy.get( '[data-test="link-create"]' ).click()
          cy.url().should( 'include', '/product/create' )
          cy.wait( 1000 )

          cy.get( `[data-test="${ formProduct.nama }"]` ).type( "product baru" )
          cy.get( `[data-test="${ formProduct.harga }"]` ).type( "{backspace}" ).type( "20000" )
          cy.get( `[data-test="${ formProduct.lokasi }"]` ).type( "semarang" )
          // cy.get( `[data-test="${ formProduct.jumlah }"]` ).type( "10")
          cy.get( `[data-test="${ formProduct.jenis }"]` ).type( "orderan" )
          cy.get( `[data-test="${ formProduct.keterangan }"]` ).type( "biasa di wilayah ungaran" )

          cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
          cy.get( `[data-test="button-submit"]` ).click()
          cy.wait( 1000 )

          cy.url().should( 'include', '/product/list' )
          cy.get( `[data-test="list-product baru"]` ).should( "exist" )
          cy.wait( 1000 )

          // if exist edit the list
          cy.get( `[data-test="edit-product baru"]` ).click()
          cy.url().should( 'include', '/product/edit/' )
          //
          cy.get( `[data-test="${ formProduct.nama }"]` ).type( "{home}" ).type( "update " )
          cy.get( `[data-test="${ formProduct.jenis }"]` ).type( " update" )
          cy.get( `[data-test="${ formProduct.lokasi }"]` ).type( " update" )
          cy.get( `[data-test="${ formProduct.harga }"]` ).type( "{backspace}".repeat( 4 ) ).type( "5000" )
          cy.get( `[data-test="${ formProduct.keterangan }"]` ).type( "{home}" ).type( "update " )
          // //
          cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
          cy.get( `[data-test="button-submit"]` ).click()
          cy.wait( 1000 )
          //
          cy.url().should( 'include', '/product/list' )
          cy.get( `[data-test="list-update product baru"]` ).should( "exist" )
          // //
          cy.get( `[data-test="delete-update product baru"]` ).click()
          cy.wait( 1000 )
          cy.get( `[data-test="list-update product baru"]` ).should( "not.exist" )

        }

      }
    )
  } )

} )