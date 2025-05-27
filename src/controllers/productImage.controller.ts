import { ProductImage, ProductImageCreateInput, ProductImageUpdateInput } from '../models/productImage.model';
import { ProductImageService } from '../services/productImage.service';
import { BaseController } from './base.controller';


export class ProductImageController extends BaseController<ProductImage, ProductImageCreateInput, ProductImageUpdateInput> {
  protected service = new ProductImageService();
  protected entityName = 'ProductImage';
}

const productImageController = new ProductImageController();
export default productImageController; 