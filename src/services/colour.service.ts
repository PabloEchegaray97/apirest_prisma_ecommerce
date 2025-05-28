import { BaseService } from './base.service';
import { Colour, ColourCreateInput, ColourUpdateInput } from '../models/colour.model';

export class ColourService extends BaseService<Colour, ColourCreateInput, ColourUpdateInput> {
  protected modelName = 'colour';
  protected selectFields = {}; // obj vacio = traer todos los campos
  
  // incluir relaciones
  protected includeRelations = {
    products: {
      where: { active: true },
      include: {
        brand: true,
        category: true,
        images: {
          where: { isPrincipalProductImage: true }
        }
      }
    }
  };
} 
