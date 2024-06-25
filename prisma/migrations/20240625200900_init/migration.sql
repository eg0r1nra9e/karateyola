-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Standing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameCategoryId" INTEGER NOT NULL,
    "close" BOOLEAN,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Standing_gameCategoryId_fkey" FOREIGN KEY ("gameCategoryId") REFERENCES "GameCategory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Standing" ("close", "created_at", "gameCategoryId", "id", "updated_at") SELECT "close", "created_at", "gameCategoryId", "id", "updated_at" FROM "Standing";
DROP TABLE "Standing";
ALTER TABLE "new_Standing" RENAME TO "Standing";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
