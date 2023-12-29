const btnS      = " btn text-white shadow "
const SDiTerima = " bg-error  " + btnS
const SProcess  = " bg-info  " + btnS
const SKirim    = " bg-warning  " + btnS
const SSelesai  = " bg-purple-400  " + btnS
export type  TStatusProduk = "Terima" | "Proses" | "Semua" | "Kirim" | "Selesai" | string

export const OStatus = [
  { s: "Terima" },
  { s: "Proses" },
  { s: "Kirim" },
  { s: "Selesai" }
]

export const Status = ( s: TStatusProduk ): string => {
  return ( s === "Terima" ) ? SDiTerima :
         ( s === "Proses" ) ? SProcess :
         ( s === "Kirim" ) ? SKirim : SSelesai
}

export const statusWarna = ( s: TStatusProduk ): string => {
  return ( s === "Terima" ) ? " bg-error " :
         ( s === "Proses" ) ? "  bg-info " :
         ( s === "Kirim" ) ? " bg-warning " :
         " bg-success "
}