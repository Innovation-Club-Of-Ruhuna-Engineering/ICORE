-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GENERAL', 'FULL', 'COMMITTEE', 'ACADEMIC', 'INDUSTRY');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'PENDING', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ProjectRole" AS ENUM ('LEADER', 'MEMBER', 'SUPERVISOR', 'CONTRIBUTOR');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('RESEARCH', 'DESIGN', 'DEVELOPMENT', 'OTHER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contactNumber" TEXT,
    "gender" TEXT,
    "department" TEXT,
    "batch" TEXT,
    "pitch" TEXT,
    "regNumber" TEXT,
    "refreshToken" TEXT,
    "role" "Role" NOT NULL DEFAULT 'GENERAL',
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ProjectType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "tags" TEXT[],
    "details" TEXT,
    "technologies" TEXT[],
    "references" TEXT[],
    "papers" TEXT[],
    "photos" TEXT[],
    "documents" TEXT[],
    "youtubeURL" TEXT,
    "websiteURL" TEXT,
    "githubURL" TEXT,
    "ownerId" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_members" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "ProjectRole" NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "ProjectRole" NOT NULL,
    "projectId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuestMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_regNumber_key" ON "users"("regNumber");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestMember" ADD CONSTRAINT "GuestMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
