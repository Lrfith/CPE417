/*
  Warnings:

  - You are about to drop the column `breed` on the `cats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cats` DROP COLUMN `breed`;

-- CreateTable
CREATE TABLE `Image` (
    `cat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `asset_id` VARCHAR(191) NOT NULL,
    `public_id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`cat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_cat_id_fkey` FOREIGN KEY (`cat_id`) REFERENCES `Cats`(`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE;
