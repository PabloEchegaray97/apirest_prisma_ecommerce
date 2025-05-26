/*
  Warnings:

  - You are about to drop the column `brand` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `colour` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `Discount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_discount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_size` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchase_order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `size` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `type` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `created_at` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `addresses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "category" DROP CONSTRAINT "category_type_id_fkey";

-- DropForeignKey
ALTER TABLE "detail" DROP CONSTRAINT "detail_order_id_fkey";

-- DropForeignKey
ALTER TABLE "detail" DROP CONSTRAINT "detail_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_discount" DROP CONSTRAINT "product_discount_id_discount_fkey";

-- DropForeignKey
ALTER TABLE "product_discount" DROP CONSTRAINT "product_discount_id_product_fkey";

-- DropForeignKey
ALTER TABLE "product_image" DROP CONSTRAINT "product_image_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_size" DROP CONSTRAINT "product_size_id_product_fkey";

-- DropForeignKey
ALTER TABLE "product_size" DROP CONSTRAINT "product_size_id_size_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "purchase_order" DROP CONSTRAINT "purchase_order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "purchase_order" DROP CONSTRAINT "purchase_order_user_id_user_address_id_fkey";

-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "brand",
DROP COLUMN "category_id",
DROP COLUMN "colour",
ADD COLUMN     "brand_id" INTEGER,
ADD COLUMN     "id_category" INTEGER,
ADD COLUMN     "id_colour" INTEGER,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET NOT NULL;

-- DropTable
DROP TABLE "Discount";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "detail";

-- DropTable
DROP TABLE "product_discount";

-- DropTable
DROP TABLE "product_image";

-- DropTable
DROP TABLE "product_size";

-- DropTable
DROP TABLE "purchase_order";

-- DropTable
DROP TABLE "size";

-- DropTable
DROP TABLE "type";

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "type_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "details" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER,
    "product_id" INTEGER,
    "order_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "discount_percentage" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_discounts" (
    "id_discount" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,

    CONSTRAINT "product_discounts_pkey" PRIMARY KEY ("id_discount","id_product")
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" SERIAL NOT NULL,
    "link" TEXT,
    "product_id" INTEGER,
    "is_principal_product_image" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_sizes" (
    "id_size" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,

    CONSTRAINT "product_sizes_pkey" PRIMARY KEY ("id_size","id_product")
);

-- CreateTable
CREATE TABLE "purchase_orders" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "user_address_id" INTEGER,
    "total" DOUBLE PRECISION,
    "payment_method" TEXT,
    "status" "Status",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "purchase_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sizes" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "system_type" "SystemType",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colours" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "colours_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "details" ADD CONSTRAINT "details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "details" ADD CONSTRAINT "details_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "purchase_orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_id_colour_fkey" FOREIGN KEY ("id_colour") REFERENCES "colours"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_discounts" ADD CONSTRAINT "product_discounts_id_discount_fkey" FOREIGN KEY ("id_discount") REFERENCES "discounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_discounts" ADD CONSTRAINT "product_discounts_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_id_size_fkey" FOREIGN KEY ("id_size") REFERENCES "sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_orders" ADD CONSTRAINT "purchase_orders_user_id_user_address_id_fkey" FOREIGN KEY ("user_id", "user_address_id") REFERENCES "user_addresses"("user_id", "address_id") ON DELETE SET NULL ON UPDATE CASCADE;
