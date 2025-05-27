import { BaseController } from './base.controller';
import { ProductDiscountService } from '../services/productDiscount.service';
import { ProductDiscount, ProductDiscountCreateInput, ProductDiscountUpdateInput } from '../models/productDiscount.model';

export class ProductDiscountController extends BaseController<ProductDiscount, ProductDiscountCreateInput, ProductDiscountUpdateInput> {
  protected service = new ProductDiscountService();
  protected entityName = 'ProductDiscount';
}

const productDiscountController = new ProductDiscountController();
export default productDiscountController; 