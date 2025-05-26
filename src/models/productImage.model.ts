import { Product } from "./product.model";

export interface ProductImage {
  id: number;
  link: string | null;
  productId: number | null;
  isPrincipalProductImage: boolean;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;

  // Relations
  product?: Product;
} 