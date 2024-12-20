import * as XLSX from 'xlsx-js-style';
import { Row } from '@tanstack/table-core';
import { TOrderServer } from '@/interface/orderan';

const saveAsExcelFile = ( buffer: any, fileName: string ) => {
  const data = new Blob( [ buffer ], { type: 'application/octet-stream' } );
  const url  = URL.createObjectURL( data );
  const link = document.createElement( 'a' );
  link.href  = url;
  link.setAttribute( 'download', fileName );
  document.body.appendChild( link );
  link.click();
  document.body.removeChild( link );
};

export const exportToExcel = ( data: Row<TOrderServer>[]
) => {
  // console.debug( data )
  const worksheet = XLSX.utils.table_to_sheet(
    document.querySelector( 'table' ) as HTMLTableElement
  );

  let wscols = [
    { width: 2 },//blank
    { width: 10 },//NO
    { width: 20 },//ID
    //-----tanggal
    { width: 20 },//Pesan
    { width: 20 },//Kirim
    { width: 20 },//waktu kirim
    // ------------------ nama
    { width: 20 },// Pengiriman
    { width: 20 },// Telephone Pengirim
    { width: 20 },// Penerima
    { width: 20 },// Alamat Penerima
    { width: 20 },// Telephone Penerima
    // ------------------
    { width: 8 },//Rebus ung
    { width: 8 },//Rebus smg
    { width: 8 },//goreng ung
    { width: 8 },//goreng sem
    { width: 8 },//bandeng presto ung
    { width: 8 },//bandeng presto sem
    { width: 8 },//otak-otak bandeng ung
    { width: 8 },//otak-otak bandeng sem
    { width: 8 },//sapi 20 ung
    { width: 8 },//sapi 20 sem
    { width: 8 },//sapi 12 ung
    { width: 8 },//sapi 12 sem
    { width: 8 },//aneka ung
    { width: 8 },//aneka sem
    { width: 8 },//nuget ung
    { width: 8 },//nuget sem
    { width: 8 },//rolade tahu ung
    { width: 8 },//rolade tahu sem
    { width: 8 },//rolade singkong ung
    { width: 8 },//rolade singkong sem
    { width: 8 },//vakum ung
    { width: 8 },//vakum ung
    { width: 8 },//lain Item
    { width: 20 },//lain total
    { width: 20 },//Ekspedisi
    { width: 20 },//Ongkir
    { width: 20 },//status
    { width: 20 },//Total
    { width: 20 },//Total bayar
    { width: 20 },//pembayaran
    { width: 30 },//keterangan
  ];

  let wsRow: { hpt: number }[] = []

  if( data.length > 0 ) {
    for( let i = 0; i < data.length + 4; i++ ) {
      const sendArray = { hpt: 20 }
      wsRow.push( sendArray )
    }
  }
  // console.debug(wsRow)

  worksheet[ '!cols' ] = wscols
  worksheet[ '!rows' ] = wsRow

  function setRow( rows: string, colors: string ) {
    if( worksheet[ rows ] ) {

    worksheet[ rows ].s = {
      alignment: {
        horizontal: "center",
        vertical  : "center",
      },
      font     : {
        bold: true,
        name: "Calibri",
        sz  : "11",
      },
      fill  : {
        // patternType: "none",
        fgColor: { rgb: colors.toUpperCase().replaceAll( "#", "" ) },
      },
      border: {
        top   : { style: "thin", color: { rgb: "000000" } },
        left  : { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        right : { style: "thin", color: { rgb: "000000" } },
      },
    };
    }

  }

  worksheet[ "J2" ].s = {
    alignment: { wrapText: true },
    font     : { bold: true },
  };

  setRow( "D1", "#ffffff" );//Tanggal
  setRow( "G1", "#ffffff" );//Nama---------  // Orderan
  setRow( "L1", "#ffc000" );//Tahu Bakso Rebus
  setRow( "N1", "#ffc000" );//Tahu Bakso Goreng
  setRow( "P1", "#ffc000" );//Bandeng Presto-  //
  setRow( "R1", "#ffc000" );//Otak-Otak Bandeng
  setRow( "T1", "#ffc000" );//Bakso Sapi 20
  setRow( "V1", "#ffc000" );//Bakso Sapi 12  // -------------
  setRow( "X1", "#ffc000" );//Bakso Aneka
  setRow( "Z1", "#ffc000" );//Nugget
  setRow( "AB1", "#ffc000" );//Rolade Tahu
  setRow( "AD1", "#ffc000" );//Rolade Singkong
  setRow( "AF1", "#ffc000" );//Tahu Bakso Vakum  // ------------
  setRow( "AH1", "#ffc000" );//Lain-Lain
  setRow( "AJ1", "#ffc000" );//Ekspedisi
  setRow( "AM1", "#ffc000" );//Total

  // -----------------------------------

  setRow( "B2", "#ffffff" );//NO
  setRow( "C2", "#ffffff" );//ID
  setRow( "D2", "#92d050" );//Pesan  // setRow( "E2", "#ff0000" );//Kirim
  setRow( "E2", "#ffffff" );//Waktu Kirim  // ----------------------
  setRow( "F2", "#ffffff" );//Pengirim
  setRow( "G2", "#ffffff" );//Telephone Penerima
  setRow( "H2", "#ffffff" );//Pengirim
  setRow( "I2", "#ffffff" );//Alamat Penerima
  setRow( "J2", "#ffffff" );//Telephone Penerima  // --------------------
  setRow( "K2", "#92d050" );//ung  // rebus
  setRow( "L2", "#fff2cc" );//smg
  setRow( "M2", "#92d050" );//ung  // goreng
  setRow( "N2", "#fff2cc" );//smg
  setRow( "O2", "#92d050" );//ung  // bandeng
  setRow( "P2", "#fff2cc" );//smg
  setRow( "Q2", "#92d050" );//ung  // otak -otak
  setRow( "R2", "#fff2cc" );//smg
  setRow( "S2", "#92d050" );//ung  //bs 20
  setRow( "T2", "#fff2cc" );//smg
  setRow( "U2", "#92d050" );//ung  //bs 12
  setRow( "V2", "#fff2cc" );//smg
  setRow( "W2", "#92d050" );//ung  //bakso aneka
  setRow( "X2", "#fff2cc" );//smg
  setRow( "Y2", "#92d050" );//ung  // nugget
  setRow( "Z2", "#fff2cc" );//smg
  setRow( "AA2", "#92d050" );//ung  // r tahu
  setRow( "AB2", "#fff2cc" );//smg
  setRow( "AC2", "#92d050" );//ung  // r songkong
  setRow( "AD2", "#fff2cc" );//smg
  setRow( "AE2", "#92d050" );//ung  // vakum
  setRow( "AF2", "#fff2cc" );//smg
  setRow( "AG2", "#ff0000" );// Item  // -----------------------------------
  setRow( "AH2", "#ff0000" );// Total Item
  setRow( "AI2", "#ddebf7" );// ekspedisi  // ---------------------------------------
  setRow( "AJ2", "#92d050" );//ongkir
  setRow( "AK2", "#92d050" );//status
  setRow( "AL2", "#92d050" );//total
  setRow( "AM2", "#92d050" );//total bayar
  setRow( "AN2", "#ffff00" );//pembayaran
  setRow( "AO2", "#ddebf7" );//Telephone Penerima

  if( data.length > 0 ) {

    for( let i = 0; i < data.length; i++ ) {

      // -----------------------------------
      setRow( `B${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//NO
      setRow( `C${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//ID
      setRow( `D${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//Pesan
      setRow( `E${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//Waktu Kirim      // ----------------------
      setRow( `F${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//Pengirim
      setRow( `G${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//Telephone Penerima
      setRow( `H${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//Pengirim
      setRow( `I${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//Alamat Penerima
      setRow( `J${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//Telephone Penerima      //
                                                                         // --------------------
      setRow( `K${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//ung      // rebus
      setRow( `L${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//smg
      setRow( `M${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//ung      // goreng
      setRow( `N${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//smg
      setRow( `O${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//ung      // bandeng
      setRow( `P${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//smg
      setRow( `Q${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//ung      // otak -otak
      setRow( `R${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//smg
      setRow( `S${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//ung      //bs 20
      setRow( `T${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//smg
      setRow( `U${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//ung      //bs 12
      setRow( `V${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//smg
      setRow( `W${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//ung      //bakso aneka
      setRow( `X${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//smg
      setRow( `Y${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//ung      // nugget
      setRow( `Z${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//smg
      setRow( `AA${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//ung      // r tahu
      setRow( `AB${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//smg
      setRow( `AC${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//ung      // r songkong
      setRow( `AD${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//smg
      setRow( `AE${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//ung      // vakum
      setRow( `AF${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//smg
      setRow( `AG${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );// Item      //
                                                                          // -----------------------------------
      setRow( `AH${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );// Total Item
      setRow( `AI${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );// ekspedisi      //
                                                                          // ---------------------------------------
      setRow( `AJ${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//ongkir
      setRow( `AK${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//status
      setRow( `AL${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//total
      setRow( `AM${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//total bayar
      setRow( `AN${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//pembayaran
      setRow( `AO${ i + 3 }`, `${ i % 2 != 0 ? "#ffffff" : "#edffd9" }` );//pembayaran

      // ------------Footer-----------------------
      setRow( `B${ data.length + 3 }`, "#ffffff" );//NO
      setRow( `C${ data.length + 3 }`, "#ffffff" );//ID
      setRow( `D${ data.length + 3 }`, "#92d050" );//Pesan
      setRow( `E${ data.length + 3 }`, "#ffffff" );//Waktu Kirim      // ----------------------
      setRow( `F${ data.length + 3 }`, "#ffffff" );//Pengirim
      setRow( `G${ data.length + 3 }`, "#ffffff" );//Telephone Penerima
      setRow( `H${ data.length + 3 }`, "#ffffff" );//Pengirim
      setRow( `I${ data.length + 3 }`, "#ffffff" );//Alamat Penerima
      setRow( `J${ data.length + 3 }`, "#ffffff" );//Telephone Penerima      // --------------------
      setRow( `K${ data.length + 3 }`, "#92d050" );//ung rebus
      setRow( `L${ data.length + 3 }`, "#fff2cc" );//smg
      setRow( `M${ data.length + 3 }`, "#92d050" );//ung      // goreng
      setRow( `N${ data.length + 3 }`, "#fff2cc" );//smg
      setRow( `O${ data.length + 3 }`, "#92d050" );//ung      // bandeng
      setRow( `P${ data.length + 3 }`, "#fff2cc" );//smg
      setRow( `Q${ data.length + 3 }`, "#92d050" );//ung      // otak -otak
      setRow( `R${ data.length + 3 }`, "#fff2cc" );//smg
      setRow( `S${ data.length + 3 }`, "#92d050" );//ung      //bs 20
      setRow( `T${ data.length + 3 }`, "#fff2cc" );//smg
      setRow( `U${ data.length + 3 }`, "#92d050" );//ung      //bs 12
      setRow( `V${ data.length + 3 }`, "#fff2cc" );//smg
      setRow( `W${ data.length + 3 }`, "#92d050" );//ung      //bakso aneka
      setRow( `X${ data.length + 3 }`, "#fff2cc" );//smg
      setRow( `Y${ data.length + 3 }`, "#92d050" );//ung      // nugget
      setRow( `Z${ data.length + 3 }`, "#fff2cc" );//smg
      setRow( `AA${ data.length + 3 }`, "#92d050" );//ung      // r tahu
      setRow( `AB${ data.length + 3 }`, "#fff2cc" );//smg
      setRow( `AC${ data.length + 3 }`, "#92d050" );//ung      // r songkong
      setRow( `AD${ data.length + 3 }`, "#fff2cc" );//smg
      setRow( `AE${ data.length + 3 }`, "#92d050" );//ung      // vakum
      setRow( `AF${ data.length + 3 }`, "#fff2cc" );//smg
      setRow( `AG${ data.length + 3 }`, "#ff0000" );// Item      // -----------------------------------
      setRow( `AH${ data.length + 3 }`, "#ff0000" );// Total Item
      setRow( `AI${ data.length + 3 }`, "#ddebf7" );// ekspedisi      // ---------------------------------------
      setRow( `AJ${ data.length + 3 }`, "#92d050" );//ongkir
      setRow( `AK${ data.length + 3 }`, "#92d050" );//status
      setRow( `AL${ data.length + 3 }`, "#92d050" );//total
      setRow( `AM${ data.length + 3 }`, "#92d050" );//total bayar
      setRow( `AN${ data.length + 3 }`, "#ffff00" );//pembayaran
      setRow( `AO${ data.length + 3 }`, "#ddebf7" );//pembayaran

      //-------------------------------------

      setRow( `D${ data.length + 4 }`, "#ffffff" );//Tanggal
      setRow( `G${ data.length + 4 }`, "#ffffff" );//Nama      // Orderan
      setRow( `L${ data.length + 4 }`, "#ffc000" );//Tahu Bakso Rebus
      setRow( `N${ data.length + 4 }`, "#ffc000" );//Tahu Bakso Goreng
      setRow( `P${ data.length + 4 }`, "#ffc000" );//Bandeng Presto      //
      setRow( `R${ data.length + 4 }`, "#ffc000" );//Otak-Otak Bandeng
      setRow( `T${ data.length + 4 }`, "#ffc000" );//Bakso Sapi 20
      setRow( `V${ data.length + 4 }`, "#ffc000" );//Bakso Sapi 12      // -------------
      setRow( `X${ data.length + 4 }`, "#ffc000" );//Bakso Aneka
      setRow( `Z${ data.length + 4 }`, "#ffc000" );//Nugget
      setRow( `AB${ data.length + 4 }`, "#ffc000" );//Rolade Tahu
      setRow( `AD${ data.length + 4 }`, "#ffc000" );//Rolade Singkong
      setRow( `AF${ data.length + 4 }`, "#ffc000" );//Tahu Bakso Vakum      // ------------
      setRow( `AH${ data.length + 4 }`, "#ffc000" );//Lain-Lain
      setRow( `AJ${ data.length + 4 }`, "#ffc000" );//Ekspedisi
      setRow( `AM${ data.length + 4 }`, "#ffc000" );//Total
    }
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet( workbook, worksheet, 'Sheet 1' );
  const excelBuffer = XLSX.write( workbook, { bookType: 'xlsx', type: 'array' } );
  saveAsExcelFile( excelBuffer, `table_data_Orderan_${ Date.now() }.xlsx` );
};

//   function setRow( rows: string = "A1", colors: string = "ef4444" ) {
//     ws[ rows ].s = {
//       // font: {
//       //   bold: true
//       // },
//       fill: {
//         // patternType: "none",
//         fgColor: { rgb: colors.toUpperCase().replace( "#", "" ) },
//       }
//     };
//   }
//
//   setRow( "A1", "#e5e7eb" );
//   setRow( "B1", "#ef4444" )
//   setRow( "C1", "#ef4444" )
//   setRow( "D1", "#ef4444" )
//   setRow( "E1", "#bbf7d0" )
//   setRow( "F1", "#bbf7d0" )
//   setRow( "G1", "#93c5fd" )
//   setRow( "H1", "#93c5fd" )
//   setRow( "I1", "#93c5fd" )
//   setRow( "J1", "#fef08a" )
//   setRow( "K1", "#fef08a" )
//   setRow( "L1", "#fef08a" )
//   setRow( "M1", "#fef08a" )
//   setRow( "N1", "#fb923c" )
//   setRow( "O1", "#fb923c" )
//   setRow( "P1", "#fb923c" )
//   setRow( "Q1", "#fb923c" )
//   setRow( "R1", "#e879f9" )
//   setRow( "S1", "#e879f9" )
//   setRow( "T1", "#e879f9" )
//   setRow( "U1", "#e879f9" )
//   setRow( "V1", "#e879f9" )

// const saveAsExcelFile = ( buffer: any, fileName: string ) => {
//   const data = new Blob( [ buffer ], { type: 'application/octet-stream' } );
//   const url = URL.createObjectURL( data );
//   const link = document.createElement( 'a' );
//   link.href = url;
//   link.setAttribute( 'download', fileName );
//   document.body.appendChild( link );
//   link.click();
//   document.body.removeChild( link );
// };
//
// // export const exportToExcel = ( table: any ) => {
// //   const worksheet = XLSX.utils.table_to_sheet(
// //     document.querySelector( 'table' ) as HTMLTableElement
// //   );
// //   const workbook = XLSX.utils.book_new();
// //   XLSX.utils.book_append_sheet( workbook, worksheet, 'Sheet 1' );
// //
// //   const excelBuffer = XLSX.write( workbook, { bookType: 'xlsx', type: 'array' } );
// //   saveAsExcelFile( excelBuffer, `table_Web_Orderan_${Date.now()}.xlsx` );
// // };
// export const exportToExcel = ( table: any[] ) => {
//   let xlDatas: any = []
//   table.forEach( xlData => {
//     console.debug( xlData.original )
//     xlDatas.push( xlData.original )
//   } )
//   const wb = XLSX.utils.book_new()
//
//   const ws = XLSX.utils.json_to_sheet( xlDatas )
//
//   XLSX.utils.sheet_add_json( ws, xlDatas, {
//     origin: "A1"
//   } );
//
//   const headRow = ( row: string, color: string ) => ws[ row ].s = {
//     // font: {
//     //   bold: true
//     // },
//     fill: {
//       patternType: "none",
//       fgColor    : { rgb: color },
//     }
//   };
//
//   function setRow( rows: string = "A1", colors: string = "ef4444" ) {
//     ws[ rows ].s = {
//       // font: {
//       //   bold: true
//       // },
//       fill: {
//         // patternType: "none",
//         fgColor: { rgb: colors.toUpperCase().replace( "#", "" ) },
//       }
//     };
//   }
//
//   setRow( "A1", "#e5e7eb" );
//   setRow( "B1", "#ef4444" )
//   setRow( "C1", "#ef4444" )
//   setRow( "D1", "#ef4444" )
//   setRow( "E1", "#bbf7d0" )
//   setRow( "F1", "#bbf7d0" )
//   setRow( "G1", "#93c5fd" )
//   setRow( "H1", "#93c5fd" )
//   setRow( "I1", "#93c5fd" )
//   setRow( "J1", "#fef08a" )
//   setRow( "K1", "#fef08a" )
//   setRow( "L1", "#fef08a" )
//   setRow( "M1", "#fef08a" )
//   setRow( "N1", "#fb923c" )
//   setRow( "O1", "#fb923c" )
//   setRow( "P1", "#fb923c" )
//   setRow( "Q1", "#fb923c" )
//   setRow( "R1", "#e879f9" )
//   setRow( "S1", "#e879f9" )
//   setRow( "T1", "#e879f9" )
//   setRow( "U1", "#e879f9" )
//   setRow( "V1", "#e879f9" )
//   // setRow( "W1", "#bef264" )
//   // setRow( "X1", "#bef264" )
//   // setRow( "Y1", "#bef264" )
//   // setRow( "Z1", "e5e7eb" )
//
//   XLSX.utils.book_append_sheet( wb, ws, "MySheet" );
//
//   XLSX.writeFile( wb, `table_Web_Orderan_${ Date.now() }.xlsx` )
//   xlDatas.length = 0
// }
