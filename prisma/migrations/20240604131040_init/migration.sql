/*
  Warnings:

  - You are about to drop the `_AthleteToCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToStanding` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_AthleteToCategory_B_index";

-- DropIndex
DROP INDEX "_AthleteToCategory_AB_unique";

-- DropIndex
DROP INDEX "_CategoryToStanding_B_index";

-- DropIndex
DROP INDEX "_CategoryToStanding_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AthleteToCategory";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CategoryToStanding";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GameCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "GameCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_GameCategoryToStanding" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GameCategoryToStanding_A_fkey" FOREIGN KEY ("A") REFERENCES "GameCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GameCategoryToStanding_B_fkey" FOREIGN KEY ("B") REFERENCES "Standing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Athlete" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "teamId" INTEGER,
    "gender" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "gameCategoryId" INTEGER,
    CONSTRAINT "Athlete_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Athlete_gameCategoryId_fkey" FOREIGN KEY ("gameCategoryId") REFERENCES "GameCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Athlete" ("created_at", "dateOfBirth", "firstName", "gender", "id", "lastName", "teamId", "updated_at", "weight") SELECT "created_at", "dateOfBirth", "firstName", "gender", "id", "lastName", "teamId", "updated_at", "weight" FROM "Athlete";
DROP TABLE "Athlete";
ALTER TABLE "new_Athlete" RENAME TO "Athlete";
CREATE UNIQUE INDEX "Athlete_firstName_lastName_dateOfBirth_teamId_key" ON "Athlete"("firstName", "lastName", "dateOfBirth", "teamId");
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "athleteId" INTEGER,
    CONSTRAINT "Category_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("created_at", "id", "name", "time", "updated_at") SELECT "created_at", "id", "name", "time", "updated_at" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_key_check("Athlete");
PRAGMA foreign_key_check("Category");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_GameCategoryToStanding_AB_unique" ON "_GameCategoryToStanding"("A", "B");

-- CreateIndex
CREATE INDEX "_GameCategoryToStanding_B_index" ON "_GameCategoryToStanding"("B");
