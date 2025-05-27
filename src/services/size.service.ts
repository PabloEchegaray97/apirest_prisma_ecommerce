import { BaseService } from './base.service';
import { SizeCreateInput, SizeUpdateInput, Size } from '../models/size.model';

export class SizeService extends BaseService<Size, SizeCreateInput, SizeUpdateInput> {
  protected modelName = 'size';
  protected selectFields = {}; // obj vacio = traer todos los campos
} 
