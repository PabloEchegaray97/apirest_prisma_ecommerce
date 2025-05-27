import { BaseService } from './base.service';
import { TypeCreateInput, TypeUpdateInput, Type } from '../models/type.model';

export class TypeService extends BaseService<Type, TypeCreateInput, TypeUpdateInput> {
  protected modelName = 'type';
  protected selectFields = {}; // obj vacio = traer todos los campos
} 
