import { BaseService } from './base.service';
import { ProductSize, ProductSizeCreateInput, ProductSizeUpdateInput} from '../models/productSize.model';

export class ProductSizeService extends BaseService<ProductSize, ProductSizeCreateInput, ProductSizeUpdateInput> {
  protected modelName = 'productSize';
  protected selectFields = {}; // obj vacio = traer todos los campos
} 
