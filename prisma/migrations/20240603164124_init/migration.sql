-- CreateTable
CREATE TABLE "_CategoryToStanding" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CategoryToStanding_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoryToStanding_B_fkey" FOREIGN KEY ("B") REFERENCES "Standing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Standing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Standing" ("categoryId", "created_at", "id", "updated_at") SELECT "categoryId", "created_at", "id", "updated_at" FROM "Standing";
DROP TABLE "Standing";
ALTER TABLE "new_Standing" RENAME TO "Standing";
PRAGMA foreign_key_check("Standing");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToStanding_AB_unique" ON "_CategoryToStanding"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToStanding_B_index" ON "_CategoryToStanding"("B");
