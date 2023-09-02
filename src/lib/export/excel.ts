import * as XLSX from 'xlsx-js-style';

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

export const exportToExcel = () => {
  const worksheet      = XLSX.utils.table_to_sheet(
    document.querySelector( 'table' ) as HTMLTableElement
  );
  let wscols           = [
    { width: 2 },//blank
    { width: 10 },//NO
    { width: 20 },//ID
    { width: 20 },//Pesan
    { width: 20 },//Kirim
    { width: 20 },//waktu kirim
    // ------------------
    { width: 20 },//Pengiriman
    { width: 20 },//Alamat Pengiriman
    { width: 20 },//Telephone
    { width: 20 },//Alamat Penerima
    { width: 20 },//Telephone Penerima
    // ------------------

    { width: 8 },//Rebus ung
    { width: 8 },//Rebus smg
    { width: 8 },//goreng ung
    { width: 8 },//goreng sem
    { width: 8 },//presto ung
    { width: 8 },//presto sem
    { width: 8 },//otak ung
    { width: 8 },//otak sem
    { width: 8 },//bandeng ung
    { width: 8 },//bandeng sem
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
    { width: 8 },//vakum sem
    { width: 20 },//Ekspedisi
    { width: 20 },//Ongkir
    { width: 20 },//status
    { width: 20 },//Total
    { width: 20 },//Total bayar
    { width: 20 },//pembayaran

  ];
  worksheet[ '!cols' ] = wscols;

  function setRow( rows: string, colors: string ) {
    worksheet[ rows ].s = {
      alignment: {
        wrapText: false
      },
      font     : {
        bold: true
      },

      fill: {
        // patternType: "none",
        fgColor: { rgb: colors.toUpperCase().replaceAll( "#", "" ) },
      }
    };
  }

  worksheet[ "J2" ].s = {
    alignment: { wrapText: true },
    font     : { bold: true },
  };

  // setRow( "D1", "#ffffff" );//Tanggal
  // setRow( "G1", "#ffffff" );//Nama
  // Orderan
  setRow( "L1", "#ffc000" );//Tahu Bakso Rebus
  setRow( "N1", "#ffc000" );//Tahu Bakso Goreng
  setRow( "P1", "#ffc000" );//Bandeng Presto
  //
  setRow( "R1", "#ffc000" );//Otak-Otak Bandeng
  setRow( "T1", "#ffc000" );//Bakso Sapi 20
  setRow( "V1", "#ffc000" );//Bakso Sapi 12
  // -------------
  setRow( "X1", "#ffc000" );//Bakso Aneka
  setRow( "Z1", "#ffc000" );//Nugget
  setRow( "AB1", "#ffc000" );//Rolade Tahu
  setRow( "AD1", "#ffc000" );//Rolade Singkong
  setRow( "AF1", "#ffc000" );//Tahu Bakso Vakum
  // ------------
  setRow( "AH1", "#ffc000" );//Lain-Lain
  setRow( "AJ1", "#ffc000" );//Ekspedisi
  setRow( "AM1", "#ffc000" );//Total

  // -----------------------------------
  // setRow( "B2", "#ffffff" );//NO
  // setRow( "C2", "#ffffff" );//ID
  setRow( "D2", "#92d050" );//Pesan
  setRow( "E2", "#ff0000" );//Kirim
  // setRow( "F2", "#ffffff" );//Waktu Kirim
  // ----------------------
  // setRow( "G2", "#ffffff" );//Pengirim
  // setRow( "H2", "#ffffff" );//Telephone Penerima
  // setRow( "I2", "#ffffff" );//Pengirim
  // setRow( "J2", "#ffffff" );//Alamat Penerima
  // setRow( "K2", "#ffffff" );//Telephone Penerima
  // --------------------
  // rebus
  setRow( "L2", "#92d050" );//ung
  setRow( "M2", "#fff2cc" );//smg

  // goreng
  setRow( "N2", "#92d050" );//ung
  setRow( "O2", "#fff2cc" );//smg

  // bandeng
  setRow( "P2", "#92d050" );//ung
  setRow( "Q2", "#fff2cc" );//smg

  // otak -otak
  setRow( "R2", "#92d050" );//ung
  setRow( "S2", "#fff2cc" );//smg

  //bs 20
  setRow( "T2", "#92d050" );//ung
  setRow( "U2", "#fff2cc" );//smg

  //bs 12
  setRow( "V2", "#92d050" );//ung
  setRow( "W2", "#fff2cc" );//smg

  //bakso aneka
  setRow( "X2", "#92d050" );//ung
  setRow( "Y2", "#fff2cc" );//smg

  // nugget
  setRow( "Z2", "#92d050" );//ung
  setRow( "AA2", "#fff2cc" );//smg

  // r tahu
  setRow( "AB2", "#92d050" );//ung
  setRow( "AC2", "#fff2cc" );//smg

  // r songkong
  setRow( "AD2", "#92d050" );//ung
  setRow( "AE2", "#fff2cc" );//smg

  // vakum
  setRow( "AF2", "#92d050" );//ung
  setRow( "AG2", "#fff2cc" );//smg

  // -----------------------------------
  setRow( "AH2", "#ff0000" );// Item
  setRow( "AI2", "#ff0000" );// Total Item

  // ---------------------------------------
  setRow( "AJ2", "#ddebf7" );// ekspedisi
  setRow( "AK2", "#92d050" );//ongkir
  setRow( "AL2", "#92d050" );//status
  setRow( "AM2", "#92d050" );//total
  setRow( "AN2", "#92d050" );//total bayar
  setRow( "AO2", "#ffff00" );//pembayaran

  console.log( worksheet )

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
//     console.log( xlData.original )
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
