import { BaseService } from './base.service';
import { DiscountCreateInput, DiscountUpdateInput, Discount } from '../models/discount.model';

export class DiscountService extends BaseService<Discount, DiscountCreateInput, DiscountUpdateInput> {
  protected modelName = 'discount';
  protected selectFields = {}; // obj vacio = traer todos los campos
} 
