import { Category } from "./category.model";
export interface Type {
  id: number;
  name: string | null;
  active: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  categories?: Category[];
}
export interface TypeCreateInput {
  name: string | null;
}
export interface TypeUpdateInput {
  name: string | null;
  active: boolean;
}