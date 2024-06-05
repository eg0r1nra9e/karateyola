-- RedefineTables
PRAGMA defer_foreign_keys=ON;
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
    CONSTRAINT "Duel_standingId_fkey" FOREIGN KEY ("standingId") REFERENCES "Standing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Duel" ("created_at", "id", "onePlayerId", "standingId", "twoPlayerId", "updated_at", "winnerId") SELECT "created_at", "id", "onePlayerId", "standingId", "twoPlayerId", "updated_at", "winnerId" FROM "Duel";
DROP TABLE "Duel";
ALTER TABLE "new_Duel" RENAME TO "Duel";
CREATE TABLE "new_GameAthlete" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "athleteId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "GameAthlete_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GameCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GameAthlete_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athlete" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_GameAthlete" ("athleteId", "categoryId", "created_at", "id", "updated_at") SELECT "athleteId", "categoryId", "created_at", "id", "updated_at" FROM "GameAthlete";
DROP TABLE "GameAthlete";
ALTER TABLE "new_GameAthlete" RENAME TO "GameAthlete";
CREATE UNIQUE INDEX "GameAthlete_categoryId_athleteId_key" ON "GameAthlete"("categoryId", "athleteId");
CREATE TABLE "new_GameCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "competitionId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "GameCategory_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "GameCompetition" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GameCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GameCategory" ("categoryId", "competitionId", "created_at", "id", "updated_at") SELECT "categoryId", "competitionId", "created_at", "id", "updated_at" FROM "GameCategory";
DROP TABLE "GameCategory";
ALTER TABLE "new_GameCategory" RENAME TO "GameCategory";
CREATE UNIQUE INDEX "GameCategory_competitionId_categoryId_key" ON "GameCategory"("competitionId", "categoryId");
CREATE TABLE "new_GameCompetition" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "competitionId" INTEGER,
    CONSTRAINT "GameCompetition_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GameCompetition_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GameCompetition" ("competitionId", "gameId", "id") SELECT "competitionId", "gameId", "id" FROM "GameCompetition";
DROP TABLE "GameCompetition";
ALTER TABLE "new_GameCompetition" RENAME TO "GameCompetition";
CREATE UNIQUE INDEX "GameCompetition_gameId_competitionId_key" ON "GameCompetition"("gameId", "competitionId");
CREATE TABLE "new_Standing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Standing_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "GameCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Standing" ("categoryId", "created_at", "id", "updated_at") SELECT "categoryId", "created_at", "id", "updated_at" FROM "Standing";
DROP TABLE "Standing";
ALTER TABLE "new_Standing" RENAME TO "Standing";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
