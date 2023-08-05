export const formatData = ( d: any, option: string ) => {
  if( option === "produk" ) {
    d.jumlah = d.jumlah ? d.jumlah : 1
    d.harga  = d.harga ? d.harga : Number( d.harga )
    d.id     = d.id ? d.id : d.id = d.nama.slice( 0, 2 ) + "_" +
      d.harga.slice( 0, 2 ) + "_" +
      d.lokasi.slice( 0, 2 ) + "_" +
      d.jenis.slice( 0, 2 ) + "_" +
      d.keterangan.slice( 0, 2 ) + "_" + Date.now()
    d.jumlah = Number( d.jumlah )
    d.harga  = Number( d.harga )
    return d
  }
  if( option === "travel" ) {
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
