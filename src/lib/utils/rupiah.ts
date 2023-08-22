export const Rupiah = ( n: number | undefined ): string => {
  if( n ) {
    return new Intl.NumberFormat( "id-ID", {
      style   : "currency",
      currency: "IDR"
    } ).format( n );
  }
  return "kosong";
}
