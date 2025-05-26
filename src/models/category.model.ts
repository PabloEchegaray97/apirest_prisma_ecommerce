import { Product } from "./product.model";
import { Type } from "./type.model";

export interface Category {
  id: number;
  name: string | null;
  typeId: number | null;
  active: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  // Relaciones
  products?: Product[];
  type?: Type;
}
