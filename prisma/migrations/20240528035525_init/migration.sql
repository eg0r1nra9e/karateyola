-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "city" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");
