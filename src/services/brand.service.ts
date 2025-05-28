import { BaseService } from './base.service';
import { BrandCreateInput, BrandUpdateInput, Brand } from '../models/brand.model';

export class BrandService extends BaseService<Brand, BrandCreateInput, BrandUpdateInput> {
  protected modelName = 'brand';
  protected selectFields = {}; // obj vacio = traer todos los campos
  
  // incluir relaciones
  protected includeRelations = {
    products: {
      where: { active: true },
      include: {
        category: true,
        colour: true,
        images: {
          where: { isPrincipalProductImage: true }
        }
      }
    }
  };
} 
