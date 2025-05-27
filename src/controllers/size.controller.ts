import { Size, SizeCreateInput, SizeUpdateInput } from '../models/size.model';
import { SizeService } from '../services/size.service';
import { BaseController } from './base.controller';

export class SizeController extends BaseController<Size, SizeCreateInput, SizeUpdateInput> {
  protected service = new SizeService();
  protected entityName = 'Size';
}

const sizeController = new SizeController();
export default sizeController; 