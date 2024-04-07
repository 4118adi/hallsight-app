-- CreateTable
CREATE TABLE `Attendee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `facePhoto` VARCHAR(191) NOT NULL,
    `enrollmentNum` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `school` VARCHAR(191) NOT NULL,
    `branch` VARCHAR(191) NOT NULL,
    `semester` INTEGER NOT NULL,

    UNIQUE INDEX `Attendee_enrollmentNum_key`(`enrollmentNum`),
    UNIQUE INDEX `Attendee_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organizer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `school` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Organizer_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
