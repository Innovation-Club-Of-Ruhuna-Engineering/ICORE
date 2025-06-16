/*
  Warnings:

  - You are about to drop the column `Department` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "Department",
ADD COLUMN     "department" TEXT,
ADD COLUMN     "pitch" TEXT;
