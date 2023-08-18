/*
  Warnings:

  - Made the column `img` on table `semuaproducts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `semuaproducts`
    MODIFY `img` VARCHAR(100) NOT NULL;
