import { Address } from "./address.model";
import { PurchaseOrder } from "./purchaseOrder.model";
import { User } from "./user.model";

export interface UsersAddress {
  userId: number;
  addressId: number;
  user: User;
  address: Address;
  purchaseOrders?: PurchaseOrder[];
}
