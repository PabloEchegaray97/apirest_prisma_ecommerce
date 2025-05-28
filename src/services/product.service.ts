import { BaseService } from './base.service';
import { ProductCreateInput, ProductUpdateInput, Product } from '../models/product.model';

export class ProductService extends BaseService<Product, ProductCreateInput, ProductUpdateInput> {
  protected modelName = 'product';
  
  // campos basicos a seleccionar
  protected selectFields = {};
  
  // incluir relaciones
  protected includeRelations = {
    brand: true,
    category: true,
    colour: true,
    images: true,
    sizes: {
      include: {
        size: true
      }
    }
  };
} 
