import { Address } from "./address.model";
import { PurchaseOrder } from "./purchaseOrder.model";
import { User } from "./user.model";
export interface UserAddress {
  userId: number;
  addressId: number;
  user: User;
  address: Address;
  purchaseOrders?: PurchaseOrder[];
}
export interface UserAddressCreateInput {
  userId: number;
  addressId: number;
}
export interface UserAddressUpdateInput {
  userId: number;
  addressId: number;
  active: boolean;
}
