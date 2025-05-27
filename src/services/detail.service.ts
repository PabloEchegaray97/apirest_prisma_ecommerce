import { BaseService } from './base.service';
import { DetailCreateInput, DetailUpdateInput, Detail } from '../models/detail.model';

export class DetailService extends BaseService<Detail, DetailCreateInput, DetailUpdateInput> {
  protected modelName = 'detail';
  protected selectFields = {}; // obj vacio = traer todos los campos
} 
