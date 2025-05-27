import { BaseService } from './base.service';
import { PurchaseOrderCreateInput, PurchaseOrderUpdateInput, PurchaseOrder } from '../models/purchaseOrder.model';

export class PurchaseOrderService extends BaseService<PurchaseOrder, PurchaseOrderCreateInput, PurchaseOrderUpdateInput> {
  protected modelName = 'purchaseOrder';
  protected selectFields = {}; // obj vacio = traer todos los campos
} 
