-- CreateEnum
CREATE TYPE "Type" AS ENUM ('ROOT', 'CHILD');

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'CHILD';
