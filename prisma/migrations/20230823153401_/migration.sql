/*
  Warnings:

  - You are about to drop the column `semuaHargaItem` on the `orderans` table. All the data in the column will be lost.
  - You are about to drop the column `semuaHargaOrderan` on the `orderans` table. All the data in the column will be lost.
  - You are about to drop the column `semuaHargaProduct` on the `orderans` table. All the data in the column will be lost.
  - You are about to drop the column `totalHarga` on the `orderans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `orderans`
    DROP COLUMN `semuaHargaItem`,
    DROP COLUMN `semuaHargaOrderan`,
    DROP COLUMN `semuaHargaProduct`,
    DROP COLUMN `totalHarga`;
