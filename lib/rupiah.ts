export const Rupiah = ( n: number ): string => {
  return new Intl.NumberFormat( "id-ID", {
    style: "currency",
    currency: "IDR"
  } ).format( n );
}
