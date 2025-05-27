import { BaseController } from './base.controller';
import { AddressService } from '../services/adress.service';
import { AddressCreateInput, AddressUpdateInput, Address } from '../models/address.model';

export class AddressController extends BaseController<Address, AddressCreateInput, AddressUpdateInput> {
  protected service = new AddressService();
  protected entityName = 'Address';
}

const addressController = new AddressController();
export default addressController; 