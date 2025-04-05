/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Curd` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Curd" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Curd" ("createdAt", "description", "id", "title") SELECT "createdAt", "description", "id", "title" FROM "Curd";
DROP TABLE "Curd";
ALTER TABLE "new_Curd" RENAME TO "Curd";
CREATE UNIQUE INDEX "Curd_title_key" ON "Curd"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
