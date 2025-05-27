import { BaseService } from './base.service';
import { ProductCreateInput, ProductUpdateInput, Product } from '../models/product.model';

export class ProductService extends BaseService<Product, ProductCreateInput, ProductUpdateInput> {
  protected modelName = 'product';
  protected selectFields = {}; // obj vacio = traer todos los campos
} 
