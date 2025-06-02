import { BaseService } from './base.service';
import { UserAddressCreateInput, UserAddressUpdateInput, UserAddress } from '../models/userAddress.model';

export class UserAddressService extends BaseService<UserAddress, UserAddressCreateInput, UserAddressUpdateInput> {
  protected modelName = 'usersAddress';
  
  // campos basicos a seleccionar
  protected selectFields = {};
  
  // incluir relaciones
  protected includeRelations = {
    user: {
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true
      }
    },
    address: true,
    purchaseOrders: {
      where: { active: true },
      include: {
        details: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
                colour: true
              }
            }
          }
        }
      }
    }
  };
} 
