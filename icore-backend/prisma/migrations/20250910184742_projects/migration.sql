-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('GENERAL', 'FULL', 'COMMITTEE', 'ACADEMIC', 'INDUSTRY');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('ACTIVE', 'PENDING', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."ProjectRole" AS ENUM ('LEADER', 'MEMBER', 'SUPERVISOR', 'CONTRIBUTOR');

-- CreateEnum
CREATE TYPE "public"."ProjectType" AS ENUM ('RESEARCH', 'DESIGN', 'DEVELOPMENT', 'OTHER');

-- CreateTable
CREATE TABLE "public"."users" (
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
    "bio" TEXT,
    "title" TEXT,
    "location" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "company" TEXT,
    "institution" TEXT,
    "fieldOfStudy" TEXT,
    "graduationYear" TEXT,
    "yearsOfExperience" INTEGER,
    "avatarUrl" TEXT,
    "coverImageUrl" TEXT,
    "website" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "youtube" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "experiences" JSONB,
    "skills" JSONB,
    "role" "public"."Role" NOT NULL DEFAULT 'GENERAL',
    "status" "public"."Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "public"."ProjectType" NOT NULL,
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
    "status" "public"."Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."project_members" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "public"."ProjectRole" NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GuestMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."ProjectRole" NOT NULL,
    "projectId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuestMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_regNumber_key" ON "public"."users"("regNumber");

-- AddForeignKey
ALTER TABLE "public"."projects" ADD CONSTRAINT "projects_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_members" ADD CONSTRAINT "project_members_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."project_members" ADD CONSTRAINT "project_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GuestMember" ADD CONSTRAINT "GuestMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
