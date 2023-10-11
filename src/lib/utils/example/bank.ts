export const formBank: Record<keyof TBank, any> = {
  hp        : "No Telephone Perusahaan",
  nama      : "Nama Bank",
  no        : "No Rekening",
  id        : "123_bank",
  lokasi    : "Lokasi Bank",
  jenis     : "Jenis Bank",
  keterangan: "Keterangan",
  img       : "URL Gambar Logo perusahaan ",
}

export const defaultFormBank: TBank = {
  hp        : "",
  nama      : "",
  no        : "",
  id        : "",
  lokasi    : "",
  jenis     : "",
  keterangan: "",
  img: "https://dummyimage.com/200x200/000/fff.jpg&text=not+found"
}
// https://dummyimage.com/200x200/000/fff.jpg&text=not+found
