import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { UserService } from '../services/user.service';
import { UserCreateInput, UserUpdateInput } from '../models/user.model';
import { User } from '../models/user.model';

export class UserController extends BaseController<User, UserCreateInput, UserUpdateInput> {
  protected service = new UserService();
  protected entityName = 'User';

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      
      const result = await this.service.login(email, password);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error('Error logging in:', error);
      
      if (error.message === 'User not found' || error.message === 'Invalid Password') {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

const userController = new UserController();
export default userController; 