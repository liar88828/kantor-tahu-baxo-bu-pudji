/*
  Warnings:

  - You are about to drop the `list_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `list_orderan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `list_semua` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `list_item`
    DROP FOREIGN KEY `List_item_list_semuaId_fkey`;

-- DropForeignKey
ALTER TABLE `list_item`
    DROP FOREIGN KEY `List_item_pesanId_fkey`;

-- DropForeignKey
ALTER TABLE `list_orderan`
    DROP FOREIGN KEY `List_orderan_list_semuaId_fkey`;

-- DropForeignKey
ALTER TABLE `list_orderan`
    DROP FOREIGN KEY `List_orderan_pesanId_fkey`;

-- DropForeignKey
ALTER TABLE `list_semua`
    DROP FOREIGN KEY `List_semua_pesanId_fkey`;

-- DropTable
DROP TABLE `list_item`;

-- DropTable
DROP TABLE `list_orderan`;

-- DropTable
DROP TABLE `list_semua`;

-- CreateTable
CREATE TABLE `List_produk`
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
ALTER TABLE `List_produk`
    ADD CONSTRAINT `List_produk_orderanId_fkey` FOREIGN KEY (`orderanId`) REFERENCES `Orderan` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
