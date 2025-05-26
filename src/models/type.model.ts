import { Category } from "./category.model";

export interface Type {
  id: number;
  name: string | null;
  active: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  categories?: Category[];
}
