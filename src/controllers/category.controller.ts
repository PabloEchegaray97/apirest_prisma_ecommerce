import { BaseController } from './base.controller';
import { CategoryService } from '../services/category.service';
import { Category, CategoryUpdateInput, CategoryCreateInput } from '../models/category.model';

export class CategoryController extends BaseController<Category, CategoryCreateInput, CategoryUpdateInput> {
  protected service = new CategoryService();
  protected entityName = 'Category';
}

const categoryController = new CategoryController();
export default categoryController; 