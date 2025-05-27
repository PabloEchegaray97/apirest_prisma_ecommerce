import { BaseController } from './base.controller';
import { DiscountService } from '../services/discount.service';
import { Discount, DiscountUpdateInput, DiscountCreateInput } from '../models/discount.model';

export class DiscountController extends BaseController<Discount, DiscountCreateInput, DiscountUpdateInput> {
  protected service = new DiscountService();
  protected entityName = 'Discount';
}

const discountController = new DiscountController();
export default discountController; 