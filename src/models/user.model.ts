import { UserRole } from "./enums";
import { PurchaseOrder } from "./purchaseOrder.model";
import { UsersAddress } from "./userAddress.model";

export interface User {
  id: number;
  name: string | null;
  lastName: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
  role: UserRole | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  addresses?: UsersAddress[];
  orders?: PurchaseOrder[];
}

export interface UserToken {
  id: number;
  email: string | null;
  role: UserRole | null;
}

export interface UserCreateInput {
  name?: string | null;
  lastName?: string | null;
  username?: string | null;
  email?: string | null;
  password: string;
  role?: UserRole | null;
  addresses?: {
    create?: {
      addressId: number;
    }[];
  };
}

export interface UserUpdateInput {
  name?: string | null;
  lastName?: string | null;
  username?: string | null;
  email?: string | null;
  password?: string | null;
  role?: UserRole | null;
  active?: boolean;
}