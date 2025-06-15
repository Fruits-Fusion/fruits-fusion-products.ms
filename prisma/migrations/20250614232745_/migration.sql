-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "discount_price" REAL NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT NOT NULL,
    "stock_quantity" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Products" ("availability", "created_at", "description", "discount_price", "id", "image", "name", "price", "stock_quantity", "updated_at") SELECT "availability", "created_at", "description", "discount_price", "id", "image", "name", "price", "stock_quantity", "updated_at" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
CREATE UNIQUE INDEX "Products_name_key" ON "Products"("name");
CREATE INDEX "Products_name_idx" ON "Products"("name");
CREATE INDEX "Products_availability_idx" ON "Products"("availability");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
