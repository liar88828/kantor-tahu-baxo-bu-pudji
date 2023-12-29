import { formOrderan } from '../../../asset/constants/model/formOrderan';

describe( 'template spec', () => {
  beforeEach( () => {
    cy.visit( '/orderan/create' )
  } )

  it.skip( "move links", () => {
    cy.wait( 500 )

    cy.get( '[data-test="link-Semua"]' ).click()
    cy.url().should( 'include', '/table/Semua' )

    cy.get( '[data-test="link-Terima"]' ).click()
    cy.url().should( 'include', '/table/Terima' )

    cy.get( '[data-test="link-Proses"]' ).click()
    cy.url().should( 'include', '/table/Proses' )

    cy.get( '[data-test="link-Kirim"]' ).click()
    cy.url().should( 'include', '/table/Kirim' )

    cy.get( '[data-test="link-Selesai"]' ).click()
    cy.url().should( 'include', '/table/Selesai' )

    cy.get( '[data-test="link-Create"]' ).click()
    cy.url().should( 'include', '/orderan/create' )
  } )

  it( "create form", () => {

    cy.get( '[data-test="link-Semua"]' ).click()
    cy.url().should( 'include', '/table/Semua' )
    cy.get( `[data-test="test-master"]` ).then( ( $el ) => {

      // cy.log($el.text())
      // const text = $el.text()

      if( $el.text().includes( 'Data is empty' ) ) {

        //-- start create data
        cy.get( '[data-test="link-Create"]' ).click()
        cy.url().should( 'include', '/orderan/create' )

        // penerima
        cy.get( `[data-test="${ formOrderan.penerima }"]` ).type( "penerima test 1" )
        cy.get( `[data-test="${ formOrderan.dari }"]` ).type( "Shoppe" )
        cy.get( `[data-test="${ formOrderan.hpPenerima }"]` ).type( "0123123123" )
        cy.get( `[data-test="${ formOrderan.alamatPenerima }"]` )
          .type( "Kecamatan Semarang Barat. Alamat: Jalan Ronggolawe Nomor2, Gisikdrono, Kota Semarang" )
        // Pengirim
        cy.get( `[data-test="${ formOrderan.pengirim }"]` ).clear().type( "jnt" )
        cy.get( `[data-test="${ formOrderan.hpPengirim }"]` ).type( "0812312312312" )
        cy.get( `[data-test="${ formOrderan.namaPengiriman }"]` ).select( 0 )
        cy.get( `[data-test="${ formOrderan.ongkir }"]` ).type( "2000" )
        cy.get( `[data-test="${ formOrderan.lokasi }"]` ).select( 0 )
        cy.get( `[data-test="${ formOrderan.typePembayaran }"]` ).select( 0 )
        // Product
        cy.get( `[data-test="search-product"]` ).type( " " )
        cy.get( `[data-test="product_0"]` ).click()
        // waktu
        cy.get( `[data-test="${ formOrderan.pesan }"]` ).clear().type( "2024-12-13" )
        cy.get( `[data-test="${ formOrderan.waktuKirim }"]` ).clear().type( "2024-12-13T08:30" )
        cy.get( `[data-test="${ formOrderan.guna }"]` ).type( "untuk di test" )
        cy.get( `[data-test="${ formOrderan.status }"]` ).select( 0 )

        cy.get( `[data-test="button-submit"]` ).click()
        // pop up
        cy.get( `[data-test="button-check"]` ).click()
        cy.contains( 'penerima test 1' )
        cy.contains( 'Shoppe' )
        cy.contains( 'Kecamatan Semarang Barat. Alamat: Jalan Ronggolawe Nomor2, Gisikdrono, Kota Semarang' )
        cy.contains( 'untuk di test' )
        cy.get( `[data-test="button-close"]` ).click()
        cy.get( `[data-test="button-check"]` ).click()
        cy.get( `[data-test="button-save"]` ).click()
        cy.get( `[data-test="button-close"]` ).click()
        cy.wait( 500 )

        // --- go table semua want to edit
        cy.get( '[data-test="link-Semua"]' ).click()
        cy.get( '[data-test="penerima"]' )
          .contains( "Penerima" )
          .parent().within( () => {
          cy.get( '[data-test="test-search"]' ).type( 'penerima test 1' )
        } )
        cy.get( '[data-test="test-checkbox"]' ).first().check()
        //---edit button
        cy.get( '[data-test="button-edit"]' ).click()
        cy.url().should( 'include', '/orderan/edit' )

        // penerima
        cy.get( `[data-test="${ formOrderan.penerima }"]` ).clear().type( "penerima update" )
        cy.get( `[data-test="${ formOrderan.dari }"]` ).type( "Shoppe" )
        cy.get( `[data-test="${ formOrderan.hpPenerima }"]` ).type( "4" )
        cy.get( `[data-test="${ formOrderan.alamatPenerima }"]` ).clear()
          .type( "Kecamatan Semarang Barat. Alamat: Jalan Ronggolawe Nomor2, Gisikdrono, Kota Semarang" )
        // Pengirim
        cy.get( `[data-test="${ formOrderan.pengirim }"]` ).clear().type( "jnt" )
        cy.get( `[data-test="${ formOrderan.hpPengirim }"]` ).type( "3" )
        cy.get( `[data-test="${ formOrderan.namaPengiriman }"]` ).select( 0 )
        cy.get( `[data-test="${ formOrderan.ongkir }"]` ).type( "2000" )
        cy.get( `[data-test="${ formOrderan.lokasi }"]` ).select( 0 )
        cy.get( `[data-test="${ formOrderan.typePembayaran }"]` ).select( 0 )
        // Product

        // delete product
        cy.get( `[data-test="trash-product_0"]` ).click()
        // search again
        cy.get( `[data-test="search-product"]` ).type( " " )
        cy.get( `[data-test="product_0"]` ).click()
        // waktu
        cy.get( `[data-test="${ formOrderan.pesan }"]` ).clear().type( "2024-12-13" )
        cy.get( `[data-test="${ formOrderan.waktuKirim }"]` ).clear().type( "2024-12-13T08:30" )
        cy.get( `[data-test="${ formOrderan.guna }"]` ).type( "untuk di test" )
        cy.get( `[data-test="${ formOrderan.status }"]` ).select( 0 )

        cy.get( `[data-test="button-submit"]` ).click()
        cy.wait( 500 )
        // pop up

        cy.get( `[data-test="button-check"]` ).click()
        cy.contains( 'penerima update' )
        cy.contains( 'Shoppe' )
        cy.contains( 'Kecamatan Semarang Barat. Alamat: Jalan Ronggolawe Nomor2, Gisikdrono, Kota Semarang' )
        cy.contains( 'untuk di test' )
        cy.get( `[data-test="button-close"]` ).click()
        cy.get( `[data-test="button-check"]` ).click()
        cy.get( `[data-test="button-save"]` ).click()
        cy.get( `[data-test="button-close"]` ).click()
        cy.wait( 500 )

        // go table want to delete
        cy.get( '[data-test="link-Semua"]' ).click()
        cy.get( '[data-test="penerima"]' )
          .contains( "Penerima" )
          .parent().within( () => {
          cy.get( '[data-test="test-search"]' ).type( 'penerima update' )
        } )
        cy.get( '[data-test="test-checkbox"]' ).first().check()
        // --delete button
        cy.get( '[data-test="button-delete"]' ).click()
      }

      else if( $el.text().includes( 'penerima test 1' ) ) {
        cy.get( '[data-test="penerima"]' )
          .contains( "Penerima" )
          .parent().within( () => {
          cy.get( '[data-test="test-search"]' ).type( 'penerima test 1' )
        } )
        cy.get( '[data-test="test-checkbox"]' ).first().check()
        cy.get( '[data-test="button-delete"]' ).click()
      }

      else if( $el.text().includes( 'penerima update' ) ) {
        cy.get( '[data-test="penerima"]' )
          .contains( "Penerima" )
          .parent().within( () => {
          cy.get( '[data-test="test-search"]' ).type( 'penerima update' )
        } )
        cy.get( '[data-test="test-checkbox"]' ).first().check()
        cy.get( '[data-test="button-delete"]' ).click()
      }

      cy.get( `[data-test="link-Semua"]` ).then( ( $el ) => {
      } )
    } )
  } )
} )
