import { Status } from '@/app/style/status';

// @ts-ignore
export const listComplex = [
  {
    title    : "Create",
    href     : "/orderan",
    className: " bg-primary "
  },
  {
    title    : "Semua",
    href     : "/table/Semua",
    className: "  bg-accent "
  },
  {
    title    : "Di Terima",
    href     : "/table/Di Terima",
    className: Status( "Di Terima" )
  },
  {
    title    : "Di Proses",
    href     : "/table/Di Proses",
    className: Status( "Di Proses" )
  },
  {
    title    : "Di Kirim",
    href     : "/table/Di Kirim",
    className: Status( "Di Kirim" )
  },
  {
    title    : "Selesai",
    href     : "/table/Selesai",
    className: Status( "Selesai" )
  },
]