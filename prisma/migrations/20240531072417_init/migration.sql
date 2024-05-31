-- CreateTable
CREATE TABLE "City" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "region" TEXT NOT NULL,
    "city" TEXT
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cityId" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Team_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_cityId_key" ON "Team"("name", "cityId");
