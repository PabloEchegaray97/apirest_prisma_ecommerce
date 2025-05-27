import { ProductSize, ProductSizeCreateInput, ProductSizeUpdateInput } from '../models/productSize.model';
import { ProductSizeService } from '../services/productSize.service';
import { BaseController } from './base.controller';


export class ProductSizeController extends BaseController<ProductSize, ProductSizeCreateInput, ProductSizeUpdateInput> {
  protected service = new ProductSizeService();
  protected entityName = 'ProductSize';
}

const productSizeController = new ProductSizeController();
export default productSizeController; 