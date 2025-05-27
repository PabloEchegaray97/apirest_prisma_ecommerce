import { Product } from "./product.model";
import { Size } from "./size.model";
export interface ProductSize {
  idSize: number;
  idProduct: number;
  active: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;

  // Relations
  size: Size;
  product: Product;
} 
export interface ProductSizeCreateInput {
  idSize: number;
  idProduct: number;
}
export interface ProductSizeUpdateInput {
  idSize: number;
  idProduct: number;
  active: boolean;
}

