import { Colour } from "../generated/prisma/client";
import { Brand } from "./brand.model";
import { Category } from "./category.model";
import { Detail } from "./detail.model";
import { Discount } from "./discount.model";
import { ProductImage } from "./productImage.model";
import { ProductSize } from "./productSize.model";

export interface Product {
  id: number;
  name: string | null;
  description: string | null;
  price: number | null;
  stock: number | null;
  image: string | null;
  categoryId: number | null;
  colourId: number | null;
  brandId: number | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  brand?: Brand;
  category?: Category;
  colour?: Colour;
  details?: Detail[];
  discounts?: Discount[];
  sizes?: ProductSize[];
  images?: ProductImage[];
}
