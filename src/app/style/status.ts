const btnS = " btn text-white shadow-md shadow-slate-400 "
const SDiTerima = " bg-error  " + btnS
const SProcess  = " bg-info  " + btnS
const SKirim    = " bg-warning  " + btnS
const SSelesai  = " bg-purple-400  " + btnS
export type  TStatusProduk = "Di Terima" | "Di Proses" | "Semua" | "Di Kirim" | "Selesai" | string

export const OStatus = [
  { s: "Di Terima" },
  { s: "Di Proses" },
  { s: "Di Kirim" },
  { s: "Selesai" }
]

export const Status = ( s: TStatusProduk ): string => {
  return ( s === "Di Terima" ) ? SDiTerima :
         ( s === "Di Proses" ) ? SProcess :
         ( s === "Di Kirim" ) ? SKirim : SSelesai
}

export const statusWarna = ( s: TStatusProduk ): string => {
  return ( s === "Di Terima" ) ? " bg-error " :
         ( s === "Di Proses" ) ? "  bg-info " :
         ( s === "Di Kirim" ) ? " bg-warning " :
         " bg-success "
}