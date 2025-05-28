import { BaseService } from './base.service';
import { ProductSize, ProductSizeCreateInput, ProductSizeUpdateInput} from '../models/productSize.model';

export class ProductSizeService extends BaseService<ProductSize, ProductSizeCreateInput, ProductSizeUpdateInput> {
  protected modelName = 'productSize';
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
    size: true
  };
} 
