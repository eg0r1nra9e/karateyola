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
    "city" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "City_city_key" ON "City"("city");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");
