import { Product } from "./product.model";
export interface Brand {
    id: number;
    name: string | null;
    active: boolean;
    createdAt: Date | null;
    updatedAt: Date | null;

    products?: Product[];
}

export interface BrandCreateInput {
    name: string | null;
}

export interface BrandUpdateInput {
    name: string | null;
    active: boolean;
}


