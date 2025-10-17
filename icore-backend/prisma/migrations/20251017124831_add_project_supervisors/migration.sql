-- CreateTable
CREATE TABLE "public"."_ProjectSupervisors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectSupervisors_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProjectSupervisors_B_index" ON "public"."_ProjectSupervisors"("B");

-- AddForeignKey
ALTER TABLE "public"."_ProjectSupervisors" ADD CONSTRAINT "_ProjectSupervisors_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProjectSupervisors" ADD CONSTRAINT "_ProjectSupervisors_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
