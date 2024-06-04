/*
  Warnings:

  - You are about to drop the `_CategoryToCompetition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_CategoryToCompetition_B_index";

-- DropIndex
DROP INDEX "_CategoryToCompetition_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CategoryToCompetition";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GameCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "competitionId" INTEGER,
    CONSTRAINT "GameCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameCategory_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GameCategory" ("categoryId", "created_at", "id", "updated_at") SELECT "categoryId", "created_at", "id", "updated_at" FROM "GameCategory";
DROP TABLE "GameCategory";
ALTER TABLE "new_GameCategory" RENAME TO "GameCategory";
PRAGMA foreign_key_check("GameCategory");
PRAGMA foreign_keys=ON;
