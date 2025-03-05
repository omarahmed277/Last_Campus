-- DropForeignKey
ALTER TABLE `chatparticipants` DROP FOREIGN KEY `ChatParticipants_userId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_requested_id_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_requester_id_fkey`;

-- DropIndex
DROP INDEX `Message_senderId_fkey` ON `message`;

-- DropIndex
DROP INDEX `Session_requested_id_fkey` ON `session`;

-- DropIndex
DROP INDEX `Session_requester_id_fkey` ON `session`;

-- AddForeignKey
ALTER TABLE `ChatParticipants` ADD CONSTRAINT `ChatParticipants_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_requester_id_fkey` FOREIGN KEY (`requester_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_requested_id_fkey` FOREIGN KEY (`requested_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
