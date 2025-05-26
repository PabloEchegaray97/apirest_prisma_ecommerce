import { Product } from "./product.model";
import { Size } from "./size.model";

export interface ProductSize {
  idSize: number;
  idProduct: number;

  // Relations
  size: Size;
  product: Product;
} 