/*
  Warnings:

  - You are about to drop the column `gameCategoryId` on the `Athlete` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_AthleteToGameCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AthleteToGameCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Athlete" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AthleteToGameCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "GameCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    CONSTRAINT "Athlete_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Athlete" ("created_at", "dateOfBirth", "firstName", "gender", "id", "lastName", "teamId", "updated_at", "weight") SELECT "created_at", "dateOfBirth", "firstName", "gender", "id", "lastName", "teamId", "updated_at", "weight" FROM "Athlete";
DROP TABLE "Athlete";
ALTER TABLE "new_Athlete" RENAME TO "Athlete";
CREATE UNIQUE INDEX "Athlete_firstName_lastName_dateOfBirth_teamId_key" ON "Athlete"("firstName", "lastName", "dateOfBirth", "teamId");
PRAGMA foreign_key_check("Athlete");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_AthleteToGameCategory_AB_unique" ON "_AthleteToGameCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_AthleteToGameCategory_B_index" ON "_AthleteToGameCategory"("B");
