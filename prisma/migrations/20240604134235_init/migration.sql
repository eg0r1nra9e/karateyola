/*
  Warnings:

  - You are about to drop the `_AthleteToGameCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CompetitionToGame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GameCategoryToStanding` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `competitionId` on the `GameCategory` table. All the data in the column will be lost.
  - Added the required column `gameCompetitionId` to the `GameCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_AthleteToGameCategory_B_index";

-- DropIndex
DROP INDEX "_AthleteToGameCategory_AB_unique";

-- DropIndex
DROP INDEX "_CompetitionToGame_B_index";

-- DropIndex
DROP INDEX "_CompetitionToGame_AB_unique";

-- DropIndex
DROP INDEX "_GameCategoryToStanding_B_index";

-- DropIndex
DROP INDEX "_GameCategoryToStanding_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AthleteToGameCategory";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CompetitionToGame";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_GameCategoryToStanding";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GameCompetition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "competitionId" INTEGER,
    CONSTRAINT "GameCompetition_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameCompetition_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameCompetitionId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "standingId" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "GameCategory_gameCompetitionId_fkey" FOREIGN KEY ("gameCompetitionId") REFERENCES "GameCompetition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GameCategory_standingId_fkey" FOREIGN KEY ("standingId") REFERENCES "Standing" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GameCategory" ("categoryId", "created_at", "id", "updated_at") SELECT "categoryId", "created_at", "id", "updated_at" FROM "GameCategory";
DROP TABLE "GameCategory";
ALTER TABLE "new_GameCategory" RENAME TO "GameCategory";
PRAGMA foreign_key_check("GameCategory");
PRAGMA foreign_keys=ON;
