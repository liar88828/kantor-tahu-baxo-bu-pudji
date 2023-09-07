/*
  Warnings:

  - You are about to drop the column `Hp` on the `banks` table. All the data in the column will be lost.
  - You are about to drop the column `No` on the `banks` table. All the data in the column will be lost.
  - Added the required column `hp` to the `Banks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Banks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no` to the `Banks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `banks`
    DROP COLUMN `Hp`,
    DROP COLUMN `No`,
    ADD COLUMN `hp`  VARCHAR(191) NOT NULL,
    ADD COLUMN `img` TEXT         NOT NULL,
    ADD COLUMN `no`  VARCHAR(191) NOT NULL;
