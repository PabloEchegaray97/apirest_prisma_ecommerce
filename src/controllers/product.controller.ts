import { BaseController } from './base.controller';
import { ProductService } from '../services/product.service';
import { Product, ProductCreateInput, ProductUpdateInput } from '../models/product.model';

export class ProductController extends BaseController<Product, ProductCreateInput, ProductUpdateInput> {
  protected service = new ProductService();
  protected entityName = 'Product';
}

const productController = new ProductController();
export default productController; 