-- CreateTable
CREATE TABLE `SemuaProducts`
(
    `id`         VARCHAR(191) NOT NULL,
    `idBarang`   VARCHAR(100) NOT NULL,
    `nama`       VARCHAR(100) NOT NULL,
    `lokasi`     VARCHAR(100) NOT NULL,
    `jenis`      VARCHAR(100) NOT NULL,
    `harga`      MEDIUMINT    NOT NULL,
    `jumlah`     MEDIUMINT    NOT NULL,
    `keterangan` TEXT         NOT NULL,
    `created_at` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3)  NOT NULL,
    `orderanId`  VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orderans`
(
    `id`                VARCHAR(100) NOT NULL,
    `pengirim`          VARCHAR(100) NOT NULL,
    `hpPengirim`        VARCHAR(20)  NOT NULL,
    `penerima`          VARCHAR(100) NOT NULL,
    `alamatPenerima`    VARCHAR(100) NOT NULL,
    `hpPenerima`        VARCHAR(100) NOT NULL,
    `pesan`             DATE         NULL,
    `kirim`             DATE         NULL,
    `waktuKirim`        TIME         NULL,
    `guna`              TEXT         NOT NULL,
    `lokasi`            VARCHAR(100) NOT NULL,
    `namaPengiriman`    VARCHAR(100) NOT NULL,
    `ekspedisi`         VARCHAR(100) NOT NULL,
    `ongkir`            MEDIUMINT    NOT NULL,
    `no`                VARCHAR(100) NOT NULL,
    `typePembayaran`    VARCHAR(100) NOT NULL,
    `totalBayar`        MEDIUMINT    NOT NULL,
    `totalPenjualan`    MEDIUMINT    NOT NULL,
    `status`            VARCHAR(20)  NOT NULL,
    `semuaHargaProduct` MEDIUMINT    NOT NULL,
    `semuaHargaItem`    MEDIUMINT    NOT NULL,
    `semuaHargaOrderan` MEDIUMINT    NOT NULL,
    `totalHarga`        MEDIUMINT    NOT NULL,
    `created_at`        DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at`        DATETIME(3)  NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produks`
(
    `id`         VARCHAR(191) NOT NULL,
    `nama`       VARCHAR(100) NOT NULL,
    `lokasi`     VARCHAR(100) NOT NULL,
    `jenis`      VARCHAR(100) NOT NULL,
    `img`        VARCHAR(100) NOT NULL,
    `harga`      MEDIUMINT    NOT NULL,
    `jumlah`     MEDIUMINT    NOT NULL,
    `keterangan` TEXT         NOT NULL,
    `created_at` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3)  NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Travels`
(
    `id`             VARCHAR(191) NOT NULL,
    `namaPengiriman` VARCHAR(191) NOT NULL,
    `noHpPerusahaan` VARCHAR(191) NOT NULL,
    `lokasi`         VARCHAR(191) NOT NULL,
    `jenis`          VARCHAR(191) NOT NULL,
    `harga`          MEDIUMINT    NOT NULL,
    `img`            VARCHAR(191) NOT NULL,
    `keterangan`     TEXT         NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SemuaProducts`
    ADD CONSTRAINT `SemuaProducts_orderanId_fkey` FOREIGN KEY (`orderanId`) REFERENCES `Orderans` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
