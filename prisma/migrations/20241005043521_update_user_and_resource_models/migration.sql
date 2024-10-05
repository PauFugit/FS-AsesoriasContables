/*
  Warnings:

  - You are about to drop the column `companyAdress` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Resource` ADD COLUMN `urldrive` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `companyAdress`,
    ADD COLUMN `companyRUT` VARCHAR(191) NULL,
    ADD COLUMN `image` VARCHAR(191) NULL;
