import { BaseService } from './base.service';
import { SizeCreateInput, SizeUpdateInput, Size } from '../models/size.model';

export class SizeService extends BaseService<Size, SizeCreateInput, SizeUpdateInput> {
  protected modelName = 'size';
  protected selectFields = {}; // obj vacio = traer todos los campos
  
  // incluir relaciones
  protected includeRelations = {
    products: {
      include: {
        product: {
          include: {
            brand: true,
            category: true,
            colour: true,
            images: {
              where: { isPrincipalProductImage: true }
            }
          }
        }
      }
    }
  };
} 
