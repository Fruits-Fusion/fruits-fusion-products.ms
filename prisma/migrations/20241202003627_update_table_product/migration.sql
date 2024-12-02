/*
  Warnings:

  - You are about to drop the column `active` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `sizes` on the `Products` table. All the data in the column will be lost.
  - Added the required column `descount_price` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "descount_price" REAL NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Products" ("created_at", "description", "id", "image", "name", "price", "stock_quantity", "updated_at") SELECT "created_at", "description", "id", "image", "name", "price", "stock_quantity", "updated_at" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
CREATE UNIQUE INDEX "Products_name_key" ON "Products"("name");
CREATE INDEX "Products_name_idx" ON "Products"("name");
CREATE INDEX "Products_availability_idx" ON "Products"("availability");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
