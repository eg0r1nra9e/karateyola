/*
  Warnings:

  - Made the column `dateOfBirth` on table `Athlete` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Competition` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
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
CREATE TABLE "new_Competition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Competition" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "Competition";
DROP TABLE "Competition";
ALTER TABLE "new_Competition" RENAME TO "Competition";
PRAGMA foreign_key_check("Athlete");
PRAGMA foreign_key_check("Competition");
PRAGMA foreign_keys=ON;
