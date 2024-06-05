/*
  Warnings:

  - You are about to drop the `GameAtlet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GameAtlet";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "GameAthlete" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "athleteId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "GameAthlete_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GameCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GameAthlete_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "GameAthlete_categoryId_athleteId_key" ON "GameAthlete"("categoryId", "athleteId");
