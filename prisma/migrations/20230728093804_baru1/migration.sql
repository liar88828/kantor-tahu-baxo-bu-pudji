/*
  Warnings:

  - Added the required column `guna` to the `Orderan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi` to the `Orderan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Orderan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderan`
    ADD COLUMN `guna`              TEXT         NOT NULL,
    ADD COLUMN `lokasi`            VARCHAR(100) NOT NULL,
    ADD COLUMN `semuaHargaItem`    MEDIUMINT    NULL,
    ADD COLUMN `semuaHargaOrderan` MEDIUMINT    NULL,
    ADD COLUMN `semuaHargaProduct` MEDIUMINT    NULL,
    ADD COLUMN `status`            VARCHAR(20)  NOT NULL,
    ADD COLUMN `totalHarga`        MEDIUMINT    NULL,
    ADD COLUMN `waktuKirim`        DATE         NULL;

-- AlterTable
ALTER TABLE `travel`
    MODIFY `keterangan` TEXT NOT NULL;
