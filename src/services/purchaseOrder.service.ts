import { BaseService } from './base.service';
import { PurchaseOrderCreateInput, PurchaseOrderUpdateInput, PurchaseOrder } from '../models/purchaseOrder.model';

export class PurchaseOrderService extends BaseService<PurchaseOrder, PurchaseOrderCreateInput, PurchaseOrderUpdateInput> {
  protected modelName = 'purchaseOrder';
  protected selectFields = {}; // obj vacio = traer todos los campos
  
  // incluir relaciones
  protected includeRelations = {
    details: {
      include: {
        product: {
          include: {
            brand: true,
            category: true,
            colour: true,
            images: {
              where: { isPrincipalProductImage: true }
            }
          }
        }
      }
    },
    usersAddress: {
      include: {
        user: {
          select: {
            id: true,
            name: true,
            lastName: true,
            email: true
          }
        },
        address: true
      }
    }
  };
} 
