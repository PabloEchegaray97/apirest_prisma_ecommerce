import { Product } from "./product.model";
import { PurchaseOrder } from "./purchaseOrder.model";
export interface Detail {
    id: number;
    quantity: number;
    orderId: number | null;
    productId: number | null;
    active: boolean;
    createdAt: Date | null;
    updatedAt: Date | null;

    order?: PurchaseOrder;
    product?: Product;
}

export interface DetailCreateInput {
    quantity: number;
    orderId: number | null;
    productId: number | null;
}

export interface DetailUpdateInput {
    quantity: number;
    orderId: number | null;
    productId: number | null;
    active: boolean;
}

