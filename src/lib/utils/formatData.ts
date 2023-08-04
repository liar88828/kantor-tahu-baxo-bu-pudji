export const formatData = ( d: any, name: string ) => {
  if( name === "produk" ) {
    d.jumlah = 1
    d.id     = d.nama.slice( 0, 2 ) + "_" +
      d.harga.slice( 0, 2 ) + "_" +
      d.lokasi.slice( 0, 2 ) + "_" +
      d.jenis.slice( 0, 2 ) + "_" +
      d.keterangan.slice( 0, 2 ) + "_" + Date.now()
    d.harga  = Number( d.harga )
    return d
  }
  if( name === "travel" ) {
    d.jumlah = 1
    d.id     = d.nama.slice( 0, 2 ) + "_" +
      d.harga.slice( 0, 2 ) + "_" +
      d.lokasi.slice( 0, 2 ) + "_" +
      d.jenis.slice( 0, 2 ) + "_" +
      d.keterangan.slice( 0, 2 ) + "_" + Date.now()
    d.harga  = Number( d.harga )
    return d
  }
}
