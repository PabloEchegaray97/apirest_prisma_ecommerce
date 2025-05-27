import { PurchaseOrder, PurchaseOrderCreateInput, PurchaseOrderUpdateInput } from '../models/purchaseOrder.model';
import { PurchaseOrderService } from '../services/purchaseOrder.service';
import { BaseController } from './base.controller';

export class PurchaseOrderController extends BaseController<PurchaseOrder, PurchaseOrderCreateInput, PurchaseOrderUpdateInput> {
  protected service = new PurchaseOrderService();
  protected entityName = 'PurchaseOrder';
}

const purchaseOrderController = new PurchaseOrderController();
export default purchaseOrderController; 