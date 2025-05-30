import { BaseService } from './base.service';
import { AddressCreateInput, AddressUpdateInput, Address } from '../models/address.model';

export class AddressService extends BaseService<Address, AddressCreateInput, AddressUpdateInput> {
  protected modelName = 'address';
  protected selectFields = {}; // obj vacio = traer todos los campos
  
  // incluir relaciones
  protected includeRelations = {
    users: {
      include: {
        user: {
          select: {
            id: true,
            name: true,
            lastName: true,
            email: true
          }
        }
      }
    }
  };
} 
