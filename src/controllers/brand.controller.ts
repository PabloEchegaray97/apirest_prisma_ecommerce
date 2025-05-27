import { BaseController } from './base.controller';
import { BrandService } from '../services/brand.service';
import { Brand, BrandUpdateInput, BrandCreateInput } from '../models/brand.model';

export class BrandController extends BaseController<Brand, BrandCreateInput, BrandUpdateInput> {
  protected service = new BrandService();
  protected entityName = 'Brand';
}

const brandController = new BrandController();
export default brandController; 