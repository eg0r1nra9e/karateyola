/*
  Warnings:

  - You are about to drop the column `standingId` on the `GameCategory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameCompetitionId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "GameCategory_gameCompetitionId_fkey" FOREIGN KEY ("gameCompetitionId") REFERENCES "GameCompetition" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GameCategory" ("categoryId", "created_at", "gameCompetitionId", "id", "updated_at") SELECT "categoryId", "created_at", "gameCompetitionId", "id", "updated_at" FROM "GameCategory";
DROP TABLE "GameCategory";
ALTER TABLE "new_GameCategory" RENAME TO "GameCategory";
CREATE TABLE "new_Standing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Standing_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GameCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Standing" ("categoryId", "created_at", "id", "updated_at") SELECT "categoryId", "created_at", "id", "updated_at" FROM "Standing";
DROP TABLE "Standing";
ALTER TABLE "new_Standing" RENAME TO "Standing";
PRAGMA foreign_key_check("GameCategory");
PRAGMA foreign_key_check("Standing");
PRAGMA foreign_keys=ON;
