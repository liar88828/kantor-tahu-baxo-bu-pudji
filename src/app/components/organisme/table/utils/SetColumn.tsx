import { Column } from '@tanstack/react-table';

export const setColumn = ( c: Column<TOrderServer> ) => {

  if( c.id.toLowerCase().includes( "kirim" ) || c.id.toLowerCase().includes( "item" ) ) {
    return " bg-red-200 "
  }
  else if( c.id.toLowerCase().includes( "pesan" ) || c.columnDef.header === "SMG" ) {
    return " bg-green-200 "
  }
  else if( c.id.toLowerCase().includes( "pembayaran" ) || c.columnDef.header === "UNG" ) {
    return "bg-yellow-200"
  }
  else if( c.id.toLowerCase().includes( "ekspedisi" ) || c.columnDef.header === "UNG" ) {
    return "bg-blue-300"
  }

  else {
    return "bg-white"
  }
}