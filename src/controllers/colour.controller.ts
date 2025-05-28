import { BaseController } from './base.controller';
import { ColourService } from '../services/colour.service';
import { Colour, ColourCreateInput, ColourUpdateInput } from '../models/colour.model';

export class ColourController extends BaseController<Colour, ColourCreateInput, ColourUpdateInput> {
  protected service = new ColourService();
  protected entityName = 'Colour';
}

const colourController = new ColourController();
export default colourController; 