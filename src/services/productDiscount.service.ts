import { BaseService } from './base.service';
import { ProductDiscountCreateInput, ProductDiscountUpdateInput, ProductDiscount } from '../models/productDiscount.model';

export class ProductDiscountService extends BaseService<ProductDiscount, ProductDiscountCreateInput, ProductDiscountUpdateInput> {
  protected modelName = 'productDiscount';
  protected selectFields = {}; // obj vacio = traer todos los campos
} 
