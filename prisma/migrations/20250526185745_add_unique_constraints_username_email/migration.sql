/*
  Warnings:

  - The values [EU0] on the enum `SystemType` will be removed. If these variants are still used in the database, this will fail.
  - The `payment_method` column on the `purchase_orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'CASH');

-- AlterEnum
BEGIN;
CREATE TYPE "SystemType_new" AS ENUM ('EU', 'US', 'UK', 'CM');
ALTER TABLE "sizes" ALTER COLUMN "system_type" TYPE "SystemType_new" USING ("system_type"::text::"SystemType_new");
ALTER TYPE "SystemType" RENAME TO "SystemType_old";
ALTER TYPE "SystemType_new" RENAME TO "SystemType";
DROP TYPE "SystemType_old";
COMMIT;

-- AlterTable
ALTER TABLE "purchase_orders" DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" "PaymentMethod";

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
