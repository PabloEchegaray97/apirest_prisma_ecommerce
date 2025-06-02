import { BaseService } from './base.service';
import { DetailCreateInput, DetailUpdateInput, Detail } from '../models/detail.model';

export class DetailService extends BaseService<Detail, DetailCreateInput, DetailUpdateInput> {
  protected modelName = 'detail';
  protected selectFields = {}; // obj vacio = traer todos los campos
  
  // incluir relaciones
  protected includeRelations = {
    product: {
      include: {
        brand: true,
        category: true,
        colour: true,
        images: {
          where: { isPrincipalProductImage: true }
        }
      }
    },
    purchaseOrder: {
      include: {
        usersAddress: {
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
      }
    }
  };
} 
