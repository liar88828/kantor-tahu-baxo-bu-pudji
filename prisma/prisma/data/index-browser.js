Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
} = require('./runtime/index-browser')

const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 5.0.0
 * Query Engine version: 6b0aef69b7cdfc787f822ecd7cdc76d5f1991584
 */
Prisma.prismaVersion = {
  client: "5.0.0",
  engine: "6b0aef69b7cdfc787f822ecd7cdc76d5f1991584"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
  )
};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
  )
}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
  )
}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
  )
}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
  )
}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
  )
}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
  )
}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
  )
}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
  )
}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
  )
}
Prisma.validator = Public.validator

/**
 * Extensions
 */
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
  )
}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
  )
}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.List_produkScalarFieldEnum = {
  id: 'id',
  nama: 'nama',
  lokasi: 'lokasi',
  jenis: 'jenis',
  img: 'img',
  harga: 'harga',
  jumlah: 'jumlah',
  keterangan: 'keterangan',
  created_at: 'created_at',
  updated_at: 'updated_at',
  orderanId: 'orderanId'
};

exports.Prisma.OrderanScalarFieldEnum = {
  id: 'id',
  keterangan: 'keterangan',
  pesan: 'pesan',
  kirim: 'kirim',
  pengirim: 'pengirim',
  hpPengirim: 'hpPengirim',
  penerima: 'penerima',
  alamatPenerima: 'alamatPenerima',
  hpPenerima: 'hpPenerima',
  namaPengiriman: 'namaPengiriman',
  ekspedisi: 'ekspedisi',
  ongkir: 'ongkir',
  no: 'no',
  typePembayaran: 'typePembayaran',
  total: 'total',
  totalBayar: 'totalBayar',
  totalPenjualan: 'totalPenjualan',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ProdukScalarFieldEnum = {
  id: 'id',
  nama: 'nama',
  lokasi: 'lokasi',
  jenis: 'jenis',
  img: 'img',
  harga: 'harga',
  jumlah: 'jumlah',
  keterangan: 'keterangan',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.TravelScalarFieldEnum = {
  id: 'id',
  namaPengiriman: 'namaPengiriman',
  noHpPerusahaan: 'noHpPerusahaan',
  lokasi: 'lokasi',
  jenis: 'jenis',
  harga: 'harga',
  img: 'img',
  keterangan: 'keterangan'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.ModelName = {
  List_produk: 'List_produk',
  Orderan: 'Orderan',
  produk: 'produk',
  travel: 'travel'
};

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
	throw new Error(
	  `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
	)
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
