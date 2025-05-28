import { Product } from "./product.model";

export interface Colour {
    id: number;
    name: string;
    value: string;
    active: boolean;
    createdAt: Date | null;
    updatedAt: Date | null;
    
    products?: Product[];
}

export interface ColourCreateInput {
    name: string;
    value: string;
}

export interface ColourUpdateInput {
    name: string;
    value: string;
    active: boolean;
}

