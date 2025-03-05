/*
  Warnings:

  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `bio` TEXT NULL,
    ADD COLUMN `country` VARCHAR(100) NOT NULL DEFAULT 'Egypt',
    ADD COLUMN `experienceLevel` ENUM('BEGINNER', 'INTERMEDIATE', 'EXPERT') NOT NULL DEFAULT 'BEGINNER',
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NOT NULL DEFAULT 'MALE',
    ADD COLUMN `phone` VARCHAR(20) NOT NULL DEFAULT '+201000000000',
    ADD COLUMN `signup_method` ENUM('MANUAL', 'GOOGLE', 'LINKEDIN') NOT NULL DEFAULT 'MANUAL',
    ADD COLUMN `specialization` VARCHAR(100) NOT NULL DEFAULT 'Other',
    MODIFY `name` VARCHAR(50) NOT NULL;
