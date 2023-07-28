/*
  Warnings:

  - You are about to drop the `list_produk` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `list_produk`
    DROP FOREIGN KEY `List_produk_orderanId_fkey`;

-- DropTable
DROP TABLE `list_produk`;

-- CreateTable
CREATE TABLE `semuaProduct`
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
    `orderanId`  VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `semuaProduct`
    ADD CONSTRAINT `semuaProduct_orderanId_fkey` FOREIGN KEY (`orderanId`) REFERENCES `Orderan` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
