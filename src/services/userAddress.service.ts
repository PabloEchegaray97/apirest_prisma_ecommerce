import { BaseService } from './base.service';
import { UserAddress, UserAddressCreateInput, UserAddressUpdateInput } from '../models/userAddress.model';

export class UserAddressService extends BaseService<UserAddress, UserAddressCreateInput, UserAddressUpdateInput> {
  protected modelName = 'userAddress';
  protected selectFields = {}; // obj vacio = traer todos los campos
} 
