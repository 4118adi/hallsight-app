/*
  Warnings:

  - Added the required column `university` to the `Attendee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attendee` ADD COLUMN `university` VARCHAR(191) NOT NULL;
