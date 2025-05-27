import { UserAddress, UserAddressUpdateInput, UserAddressCreateInput } from '../models/userAddress.model';
import { UserAddressService } from '../services/userAddress.service'
import { BaseController } from './base.controller';

export class UserAddressController extends BaseController<UserAddress, UserAddressCreateInput, UserAddressUpdateInput> {
  protected service = new UserAddressService();
  protected entityName = 'UserAddress';
} 

const userAddressController = new UserAddressController();
export default userAddressController; 