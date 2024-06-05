/*
  Warnings:

  - You are about to drop the column `gameCompetitionId` on the `GameCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gameId,competitionId]` on the table `GameCompetition` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `competitionId` to the `GameCategory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "GameAtlet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "athleteId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "GameAtlet_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GameCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameAtlet_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "competitionId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "GameCategory_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "GameCompetition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GameCategory" ("categoryId", "created_at", "id", "updated_at") SELECT "categoryId", "created_at", "id", "updated_at" FROM "GameCategory";
DROP TABLE "GameCategory";
ALTER TABLE "new_GameCategory" RENAME TO "GameCategory";
CREATE UNIQUE INDEX "GameCategory_competitionId_categoryId_key" ON "GameCategory"("competitionId", "categoryId");
PRAGMA foreign_key_check("GameCategory");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "GameAtlet_categoryId_athleteId_key" ON "GameAtlet"("categoryId", "athleteId");

-- CreateIndex
CREATE UNIQUE INDEX "GameCompetition_gameId_competitionId_key" ON "GameCompetition"("gameId", "competitionId");
