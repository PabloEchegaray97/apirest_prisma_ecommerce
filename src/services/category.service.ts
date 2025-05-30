import { BaseService } from './base.service';
import { CategoryCreateInput, CategoryUpdateInput, Category } from '../models/category.model';

export class CategoryService extends BaseService<Category, CategoryCreateInput, CategoryUpdateInput> {
  protected modelName = 'category';
  protected selectFields = {}; // obj vacio = traer todos los campos
  
  // incluir relaciones
  protected includeRelations = {
    type: true,
    products: {
      where: { active: true },
      include: {
        brand: true,
        colour: true,
        images: {
          where: { isPrincipalProductImage: true }
        }
      }
    }
  };
} 
