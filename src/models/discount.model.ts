import { Product } from "./product.model";

export interface Discount {
  id: number;
  startDate: Date | null;
  endDate: Date | null;
  discountPercentage: number | null;
  active: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;

  products?: Product[];
}
