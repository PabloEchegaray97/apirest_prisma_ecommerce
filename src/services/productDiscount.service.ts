import { BaseService } from './base.service';
import { ProductDiscountCreateInput, ProductDiscountUpdateInput, ProductDiscount } from '../models/productDiscount.model';

export class ProductDiscountService extends BaseService<ProductDiscount, ProductDiscountCreateInput, ProductDiscountUpdateInput> {
  protected modelName = 'productDiscount';
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
    discount: true
  };
} 
