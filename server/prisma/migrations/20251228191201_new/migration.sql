/*
  Warnings:

  - You are about to drop the column `clientName` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Project` table. All the data in the column will be lost.
  - Added the required column `shortDesc` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProjectImage" DROP CONSTRAINT "ProjectImage_projectId_fkey";

-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "clientName",
DROP COLUMN "serviceId",
DROP COLUMN "year",
ADD COLUMN     "shortDesc" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."ProjectImage" ADD CONSTRAINT "ProjectImage_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
