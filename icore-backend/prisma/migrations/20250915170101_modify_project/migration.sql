/*
  Warnings:

  - You are about to drop the column `about` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."projects" DROP COLUMN "about",
DROP COLUMN "details",
ADD COLUMN     "techDetails" TEXT;
