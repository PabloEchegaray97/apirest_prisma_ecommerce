import { Type, TypeCreateInput, TypeUpdateInput } from '../models/type.model';
import { TypeService } from '../services/type.service';
import { BaseController } from './base.controller';

export class TypeController extends BaseController<Type, TypeCreateInput, TypeUpdateInput> {
  protected service = new TypeService();
  protected entityName = 'Type';
} 

const typeController = new TypeController();
export default typeController; 