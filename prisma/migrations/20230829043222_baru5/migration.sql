-- CreateTable
CREATE TABLE `Banks`
(
    `id`         VARCHAR(191) NOT NULL,
    `Hp`         VARCHAR(191) NOT NULL,
    `No`         VARCHAR(191) NOT NULL,
    `nama`       VARCHAR(191) NOT NULL,
    `lokasi`     VARCHAR(191) NOT NULL,
    `jenis`      VARCHAR(191) NOT NULL,
    `keterangan` TEXT         NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
