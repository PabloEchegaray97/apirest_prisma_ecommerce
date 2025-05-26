-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CLIENT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SystemType" AS ENUM ('EU0', 'US', 'UK', 'CM');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,
    "role" "UserRole",
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "street" TEXT,
    "town" TEXT,
    "state" TEXT,
    "cpi" TEXT,
    "country" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "name" TEXT,
    "type_id" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detail" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "quantity" INTEGER,
    "product_id" INTEGER,
    "order_id" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discount" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "discount_percentage" INTEGER,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "name" TEXT,
    "price" DOUBLE PRECISION,
    "description" TEXT,
    "image" TEXT,
    "category_id" INTEGER,
    "colour" INTEGER,
    "brand" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_discount" (
    "id_discount" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,

    CONSTRAINT "product_discount_pkey" PRIMARY KEY ("id_discount","id_product")
);

-- CreateTable
CREATE TABLE "product_image" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "link" TEXT,
    "product_id" INTEGER,
    "is_principal_product_image" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "product_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_size" (
    "id_size" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,

    CONSTRAINT "product_size_pkey" PRIMARY KEY ("id_size","id_product")
);

-- CreateTable
CREATE TABLE "purchase_order" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "user_id" INTEGER,
    "user_address_id" INTEGER,
    "total" DOUBLE PRECISION,
    "payment_method" TEXT,
    "status" "Status",
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "purchase_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "size" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "number" TEXT NOT NULL,
    "system_type" "SystemType",

    CONSTRAINT "size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_addresses" (
    "user_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,

    CONSTRAINT "user_addresses_pkey" PRIMARY KEY ("user_id","address_id")
);

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail" ADD CONSTRAINT "detail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail" ADD CONSTRAINT "detail_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "purchase_order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_discount" ADD CONSTRAINT "product_discount_id_discount_fkey" FOREIGN KEY ("id_discount") REFERENCES "Discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_discount" ADD CONSTRAINT "product_discount_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_size" ADD CONSTRAINT "product_size_id_size_fkey" FOREIGN KEY ("id_size") REFERENCES "size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_size" ADD CONSTRAINT "product_size_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_user_id_user_address_id_fkey" FOREIGN KEY ("user_id", "user_address_id") REFERENCES "user_addresses"("user_id", "address_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
