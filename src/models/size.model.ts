import { SystemType } from "./enums";
import { ProductSize } from "./productSize.model";

export interface Size {
  id: number;
  number: string;
  systemType: SystemType | null;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;

  // Relations
  products?: ProductSize[];
} 