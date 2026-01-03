-- AlterTable
ALTER TABLE "public"."Project" ADD COLUMN     "isEmbedded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isMechanical" BOOLEAN NOT NULL DEFAULT false;
