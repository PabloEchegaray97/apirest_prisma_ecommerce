import { Product } from "./product.model";
import { Discount } from "./discount.model";


export interface ProductDiscount {
  id: number;
  idProduct: number;
  idDiscount: number;
  active: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;

  product?: Product;
  discount?: Discount;
}