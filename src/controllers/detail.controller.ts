import { BaseController } from './base.controller';
import { DetailService } from '../services/detail.service';
import { Detail, DetailUpdateInput, DetailCreateInput } from '../models/detail.model';

export class DetailController extends BaseController<Detail, DetailCreateInput, DetailUpdateInput> {
  protected service = new DetailService();
  protected entityName = 'Detail';
}

const detailController = new DetailController();
export default detailController; 