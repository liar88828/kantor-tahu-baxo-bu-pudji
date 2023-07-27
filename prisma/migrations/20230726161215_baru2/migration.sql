/*
  Warnings:

  - You are about to drop the `pesan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `list_item`
    DROP FOREIGN KEY `List_item_pesanId_fkey`;

-- DropForeignKey
ALTER TABLE `list_orderan`
    DROP FOREIGN KEY `List_orderan_pesanId_fkey`;

-- DropForeignKey
ALTER TABLE `list_semua`
    DROP FOREIGN KEY `List_semua_pesanId_fkey`;

-- DropTable
DROP TABLE `pesan`;

-- CreateTable
CREATE TABLE `Orderan`
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

-- AddForeignKey
ALTER TABLE `List_item`
    ADD CONSTRAINT `List_item_pesanId_fkey` FOREIGN KEY (`pesanId`) REFERENCES `Orderan` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_orderan`
    ADD CONSTRAINT `List_orderan_pesanId_fkey` FOREIGN KEY (`pesanId`) REFERENCES `Orderan` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `List_semua`
    ADD CONSTRAINT `List_semua_pesanId_fkey` FOREIGN KEY (`pesanId`) REFERENCES `Orderan` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
