-- DropIndex
DROP INDEX "projects_name_key";

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "media" TEXT[],
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "timeline" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "regNumber" DROP NOT NULL;
