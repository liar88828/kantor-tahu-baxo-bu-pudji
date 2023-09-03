import { TListCard } from '@/app/dashboard/CardList';

export const dataOrderan = [
  { status: "di pesan", nama: 'Tahu Bakso Rebus', harga: 42000, tanggal: '2023-07-26' },
  { status: "di pesan", nama: 'Tahu Bakso Vakum', harga: 46000, tanggal: '2023-06-26' },
  { status: "di pesan", nama: 'Tahu Bakso Special', harga: 50000, tanggal: '2023-04-26' },
  { status: "di kirim", nama: 'Tahu Bakso Goreng', harga: 45000, tanggal: '2023-08-26' },
  { status: "di kirim", nama: 'Bandeng Presto', harga: 60000, tanggal: '2023-02-26' },
  { status: "di kirim", nama: 'Otak-Otak Bandeng', harga: 70000, tanggal: '2024-08-26' },
  { status: "di kirim", nama: 'Bakso Sapi 20', harga: 40000, tanggal: '2023-02-26' },
  { status: "di kirim", nama: 'Bakso Sapi 12', harga: 25000, tanggal: '2023-08-26' },
  { status: "di pesan", nama: 'Bakso Aneka', harga: 29000, tanggal: '2023-08-26' },
  { status: "di pesan", nama: 'Nugget', harga: 27000, tanggal: '2023-08-26' },
  { status: "di pesan", nama: 'Rolade Tahu', harga: 19000, tanggal: '2023-08-26' },
  { status: "di pesan", nama: 'Rolade Singkong', harga: 19000, tanggal: '2023-08-26' }
]

export const dataList: TListCard[] = [
  {
    id            : "12312",
    penerima      : 'Arla uguanu rh',
    hpPenerima    : '0114',
    alamatPenerima: 'Hanita',
    pengirim      : 'Fe hKKhAsn wl',
    namaPengiriman: 'Delivery update',
    kirim         : '2023-08-18T00:00:00.000Z',
    pesan         : '2023-08-31T00:00:00.000Z',
    status        : 'Di terima',
    typePembayaran: 'Cash',
    totalBayar    : 181044,
    waktuKirim    : "",
    semuaProduct  : []
  }

]
