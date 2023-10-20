import { formTravel } from '../../asset/constants/model/travel';

describe( 'template spec', () => {
  beforeEach( () => {
    cy.visit( '/travel/list' )
  } )

  it.skip( "move links", () => {
    cy.get( '[data-test="link-create"]' ).click()
    cy.url().should( 'include', '/travel/create' )

    cy.get( '[data-test="link-list"]' ).click()
    cy.url().should( 'include', '/travel/list' )
  } )

  it( "create form", () => {
    cy.get( `[data-test="list-travel"]` ).then( ( $el ) => {
        cy.wait( 2000 )
        if( $el.text().includes( "update travel" ) ) {
          cy.get( `[data-test="delete-update travel"]` ).click()
          cy.wait( 2000 )
        }
        else if( $el.text().includes( "travel" ) ) {
          cy.get( `[data-test="delete-travel baru"]` ).click()
          cy.wait( 2000 )
        }
        else {
          // create again
          cy.get( '[data-test="link-create"]' ).click()
          cy.url().should( 'include', '/travel/create' )
          cy.wait( 2000 )

          cy.get( `[data-test="${ formTravel.nama }"]` ).type( "travel baru" )
          cy.get( `[data-test="${ formTravel.lokasi }"]` ).type( "semarang" )
          cy.get( `[data-test="${ formTravel.jenis }"]` ).type( "box" )
          cy.get( `[data-test="${ formTravel.hp }"]` ).type( "01231231" )
          cy.get( `[data-test="${ formTravel.harga }"]` ).type( "20000" )
          cy.get( `[data-test="${ formTravel.keterangan }"]` ).type( "biasa di wilayah ungaran" )

          cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
          cy.get( `[data-test="button-submit"]` ).click()
          cy.wait( 2000 )
          //

          cy.url().should( 'include', '/travel/list' )
          cy.get( `[data-test="list-travel baru"]` ).should( "exist" )
          cy.wait( 2000 )

          // if exist edit the list
          cy.get( `[data-test="edit-travel baru"]` ).click()
          cy.url().should( 'include', '/travel/edit/' )

          cy.get( `[data-test="${ formTravel.nama }"]` ).type( "{home}" ).type( "update " )
          cy.get( `[data-test="${ formTravel.lokasi }"]` ).type( " update" )
          cy.get( `[data-test="${ formTravel.jenis }"]` ).type( " update" )
          cy.get( `[data-test="${ formTravel.hp }"]` ).type( "{backspace}" ).type( "9" )
          cy.get( `[data-test="${ formTravel.harga }"]` ).type( "{backspace}".repeat( 4 ) ).type( "5000" )
          cy.get( `[data-test="${ formTravel.keterangan }"]` ).type( "{home}" ).type( "update " )
          //
          cy.get( `[data-test="img-prev"]` ).should( "not.exist" )
          cy.get( `[data-test="button-submit"]` ).click()
          cy.wait( 2000 )

          cy.url().should( 'include', '/travel/list' )
          cy.get( `[data-test="list-update travel baru"]` ).should( "exist" )
          //
          cy.get( `[data-test="delete-update travel baru"]` ).click()
          cy.wait( 2000 )
          cy.get( `[data-test="list-update travel baru"]` ).should( "not.exist" )

        }

      }
    )
  } )

} )