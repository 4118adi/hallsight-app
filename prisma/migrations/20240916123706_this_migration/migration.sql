/*
  Warnings:

  - You are about to drop the column `hallId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `organizerId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `hall` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizer` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_hallId_fkey`;

-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_organizerId_fkey`;

-- AlterTable
ALTER TABLE `Event` DROP COLUMN `hallId`,
    DROP COLUMN `organizerId`,
    ADD COLUMN `hall` VARCHAR(191) NOT NULL,
    ADD COLUMN `organizer` VARCHAR(191) NOT NULL;
