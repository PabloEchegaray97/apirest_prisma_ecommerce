import { Detail } from "./detail.model";
import { PaymentMethod, Status } from "./enums";
import { User } from "./user.model";
import { UserAddress } from "./userAddress.model";

export interface PurchaseOrder {
  id: number;
  userId: number;
  userAddressId: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: Status;
  createdAt: Date | null;
  updatedAt: Date | null;
  active: boolean;

  user?: User;
  userAddress?: UserAddress;
  details?: Detail[];
}
