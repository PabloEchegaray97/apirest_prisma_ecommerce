import { UserAddress } from "./userAddress.model";

export interface Address {
  id: number;
  street: string | null;
  town: string | null;
  state: string | null;
  cpi: string | null;
  country: string | null;
  active: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;

  userAddress?: UserAddress[]; 
}

export interface AddressCreateInput {
  street: string | null;
  town: string | null;
  state: string | null;
  cpi: string | null;
  country: string | null;
}

export interface AddressUpdateInput {
  street: string | null;
  town: string | null;
  state: string | null;
  cpi: string | null;
  country: string | null;
  active: boolean;
}

