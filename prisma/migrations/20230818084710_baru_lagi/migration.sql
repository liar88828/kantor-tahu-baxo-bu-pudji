/*
  Warnings:

  - You are about to drop the `bank` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `semuaproducts`
    ADD COLUMN `img` VARCHAR(100) NULL;

-- DropTable
DROP TABLE `bank`;
