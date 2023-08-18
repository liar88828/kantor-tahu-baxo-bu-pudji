import * as XLSX from 'xlsx-js-style';

const saveAsExcelFile = ( buffer: any, fileName: string ) => {
  const data = new Blob( [ buffer ], { type: 'application/octet-stream' } );
  const url = URL.createObjectURL( data );
  const link = document.createElement( 'a' );
  link.href = url;
  link.setAttribute( 'download', fileName );
  document.body.appendChild( link );
  link.click();
  document.body.removeChild( link );
};

// export const exportToExcel = ( table: any ) => {
//   const worksheet = XLSX.utils.table_to_sheet(
//     document.querySelector( 'table' ) as HTMLTableElement
//   );
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet( workbook, worksheet, 'Sheet 1' );
//
//   const excelBuffer = XLSX.write( workbook, { bookType: 'xlsx', type: 'array' } );
//   saveAsExcelFile( excelBuffer, `table_Web_Orderan_${Date.now()}.xlsx` );
// };
export const exportToExcel = ( table: any[] ) => {
  let xlDatas: any = []
  table.forEach( xlData => {
    console.log( xlData.original )
    xlDatas.push( xlData.original )
  } )
  const wb = XLSX.utils.book_new()

  const ws = XLSX.utils.json_to_sheet( xlDatas )

  XLSX.utils.sheet_add_json( ws, xlDatas, {
    origin: "A1"
  } );

  const headRow = ( row: string, color: string ) => ws[ row ].s = {
    // font: {
    //   bold: true
    // },
    fill: {
      patternType: "none",
      fgColor    : { rgb: color },
    }
  };

  function setRow( rows: string = "A1", colors: string = "ef4444" ) {
    ws[ rows ].s = {
      // font: {
      //   bold: true
      // },
      fill: {
        // patternType: "none",
        fgColor: { rgb: colors.toUpperCase().replace( "#", "" ) },
      }
    };
  }

  setRow( "A1", "#e5e7eb" );
  setRow( "B1", "#ef4444" )
  setRow( "C1", "#ef4444" )
  setRow( "D1", "#ef4444" )
  setRow( "E1", "#bbf7d0" )
  setRow( "F1", "#bbf7d0" )
  setRow( "G1", "#93c5fd" )
  setRow( "H1", "#93c5fd" )
  setRow( "I1", "#93c5fd" )
  setRow( "J1", "#fef08a" )
  setRow( "K1", "#fef08a" )
  setRow( "L1", "#fef08a" )
  setRow( "M1", "#fef08a" )
  setRow( "N1", "#fb923c" )
  setRow( "O1", "#fb923c" )
  setRow( "P1", "#fb923c" )
  setRow( "Q1", "#fb923c" )
  setRow( "R1", "#e879f9" )
  setRow( "S1", "#e879f9" )
  setRow( "T1", "#e879f9" )
  setRow( "U1", "#e879f9" )
  setRow( "V1", "#e879f9" )
  // setRow( "W1", "#bef264" )
  // setRow( "X1", "#bef264" )
  // setRow( "Y1", "#bef264" )
  // setRow( "Z1", "e5e7eb" )

  XLSX.utils.book_append_sheet( wb, ws, "MySheet" );

  XLSX.writeFile( wb, `table_Web_Orderan_${ Date.now() }.xlsx` )
  xlDatas.length = 0
}