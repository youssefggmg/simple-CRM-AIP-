/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customerEmail]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `sale` MODIFY `productID` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_phoneNumber_key` ON `Customer`(`phoneNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `Customer_customerEmail_key` ON `Customer`(`customerEmail`);
