/*
  Warnings:

  - Added the required column `standingId` to the `Duel` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Standing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Duel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "onePlayerId" INTEGER NOT NULL,
    "twoPlayerId" INTEGER NOT NULL,
    "winnerId" INTEGER NOT NULL,
    "standingId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Duel_onePlayerId_fkey" FOREIGN KEY ("onePlayerId") REFERENCES "Athlete" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Duel_twoPlayerId_fkey" FOREIGN KEY ("twoPlayerId") REFERENCES "Athlete" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Duel_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Athlete" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Duel_standingId_fkey" FOREIGN KEY ("standingId") REFERENCES "Standing" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Duel" ("created_at", "id", "onePlayerId", "twoPlayerId", "updated_at", "winnerId") SELECT "created_at", "id", "onePlayerId", "twoPlayerId", "updated_at", "winnerId" FROM "Duel";
DROP TABLE "Duel";
ALTER TABLE "new_Duel" RENAME TO "Duel";
PRAGMA foreign_key_check("Duel");
PRAGMA foreign_keys=ON;
