-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Duel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "onePlayerId" INTEGER NOT NULL,
    "twoPlayerId" INTEGER,
    "winnerId" INTEGER,
    "standingId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Duel_onePlayerId_fkey" FOREIGN KEY ("onePlayerId") REFERENCES "Athlete" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Duel_twoPlayerId_fkey" FOREIGN KEY ("twoPlayerId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Duel_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Athlete" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Duel_standingId_fkey" FOREIGN KEY ("standingId") REFERENCES "Standing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Duel" ("created_at", "id", "onePlayerId", "standingId", "twoPlayerId", "updated_at", "winnerId") SELECT "created_at", "id", "onePlayerId", "standingId", "twoPlayerId", "updated_at", "winnerId" FROM "Duel";
DROP TABLE "Duel";
ALTER TABLE "new_Duel" RENAME TO "Duel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
