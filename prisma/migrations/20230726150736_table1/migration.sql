-- CreateTable
CREATE TABLE `List_item`
(
    `id`           VARCHAR(191) NOT NULL,
    `nama`         VARCHAR(100) NOT NULL,
    `lokasi`       VARCHAR(100) NOT NULL,
    `jenis`        VARCHAR(100) NOT NULL,
    `img`          VARCHAR(100) NOT NULL,
    `harga`        MEDIUMINT    NULL,
    `jumlah`       MEDIUMINT    NULL,
    `keterangan`   TEXT         NOT NULL,
    `created_at`   DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at`   DATETIME(3)  NOT NULL,
    `list_semuaId` VARCHAR(191) NULL,
    `pesanId`      VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `List_orderan`
(
    `id`           VARCHAR(191) NOT NULL,
    `nama`         VARCHAR(100) NOT NULL,
    `lokasi`       VARCHAR(100) NOT NULL,
    `jenis`        VARCHAR(100) NOT NULL,
    `img`          VARCHAR(100) NOT NULL,
    `harga`        MEDIUMINT    NULL,
    `jumlah`       MEDIUMINT    NULL,
    `keterangan`   TEXT         NOT NULL,
    `created_at`   DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at`   DATETIME(3)  NOT NULL,
    `list_semuaId` VARCHAR(191) NULL,
    `pesanId`      VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `List_semua`
(
    `id`         VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3)  NOT NULL,
    `pesanId`    VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pesan`
(
    `id`             VARCHAR(191) NOT NULL,
    `keterangan`     TEXT         NOT NULL,
    `pesan`          DATE         NULL,
    `kirim`          DATE         NULL,
    `pengirim`       VARCHAR(100) NOT NULL,
    `hpPengirim`     VARCHAR(20)  NOT NULL,
    `penerima`       VARCHAR(100) NOT NULL,
    `alamatPenerima` VARCHAR(100) NOT NULL,
    `hpPenerima`     VARCHAR(100) NOT NULL,
    `namaPengiriman` VARCHAR(100) NOT NULL,
    `ekspedisi`      VARCHAR(100) NOT NULL,
    `ongkir`         MEDIUMINT    NULL,
    `no`             VARCHAR(100) NOT NULL,
    `typePembayaran` VARCHAR(100) NOT NULL,
    `total`          MEDIUMINT    NULL,
    `totalBayar`     MEDIUMINT    NULL,
    `totalPenjualan` MEDIUMINT    NULL,
    `created_at`     DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at`     DATETIME(3)  NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produk`
(
    `id`         VARCHAR(191) NOT NULL,
    `nama`       VARCHAR(100) NOT NULL,
    `lokasi`     VARCHAR(100) NOT NULL,
    `jenis`      VARCHAR(100) NOT NULL,
    `img`        VARCHAR(100) NOT NULL,
    `harga`      MEDIUMINT    NULL,
    `jumlah`     MEDIUMINT    NULL,
    `keterangan` TEXT         NOT NULL,
    `created_at` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3)  NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `travel`
(
    `id`             VARCHAR(191) NOT NULL,
    `namaPengiriman` VARCHAR(191) NOT NULL,
    `noHpPerusahaan` VARCHAR(191) NOT NULL,
    `lokasi`         VARCHAR(191) NOT NULL,
    `jenis`          VARCHAR(191) NOT NULL,
    `harga`          MEDIUMINT    NOT NULL,
    `img`            VARCHAR(191) NOT NULL,
    `keterangan`     VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `List_item`
    ADD CONSTRAINT `List_item_list_semuaId_fkey` FOREIGN KEY (`list_semuaId`) REFERENCES `List_semua` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_item`
    ADD CONSTRAINT `List_item_pesanId_fkey` FOREIGN KEY (`pesanId`) REFERENCES `pesan` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_orderan`
    ADD CONSTRAINT `List_orderan_list_semuaId_fkey` FOREIGN KEY (`list_semuaId`) REFERENCES `List_semua` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_orderan`
    ADD CONSTRAINT `List_orderan_pesanId_fkey` FOREIGN KEY (`pesanId`) REFERENCES `pesan` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_semua`
    ADD CONSTRAINT `List_semua_pesanId_fkey` FOREIGN KEY (`pesanId`) REFERENCES `pesan` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
