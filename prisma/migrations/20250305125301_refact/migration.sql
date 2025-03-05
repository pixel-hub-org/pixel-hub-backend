/*
  Warnings:

  - You are about to drop the column `userId` on the `players` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "players" DROP CONSTRAINT "players_userId_fkey";

-- AlterTable
ALTER TABLE "players" DROP COLUMN "userId";
