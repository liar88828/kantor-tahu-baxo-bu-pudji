import * as XLSX from 'xlsx';

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

const exportToExcel = ( table: any ) => {
  const worksheet = XLSX.utils.table_to_sheet(
    document.querySelector( 'table' ) as HTMLTableElement
  );
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet( workbook, worksheet, 'Sheet 1' );
  const excelBuffer = XLSX.write( workbook, { bookType: 'xlsx', type: 'array' } );
  saveAsExcelFile( excelBuffer, 'table_data.xlsx' );
};

export { saveAsExcelFile, exportToExcel }