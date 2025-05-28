import { BaseService } from './base.service';
import { ProductImageCreateInput, ProductImageUpdateInput, ProductImage } from '../models/productImage.model';

export class ProductImageService extends BaseService<ProductImage, ProductImageCreateInput, ProductImageUpdateInput> {
  protected modelName = 'productImage';
  protected selectFields = {}; // obj vacio = traer todos los campos
  
  // incluir relaciones
  protected includeRelations = {
    product: {
      include: {
        brand: true,
        category: true,
        colour: true
      }
    }
  };
} 
