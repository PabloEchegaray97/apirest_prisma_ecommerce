import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.findById(parseInt(id));
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error getting user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;       
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required' });
      }
      
      const newUser = await userService.create({ name, email, password });
      return res.status(201).json(newUser);
    } catch (error: any) {
      console.error('Error creating user:', error);
      // si es un error de Prisma por email duplicado
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      // verificar si el usuario existe
      const userExistente = await userService.findById(parseInt(id));
      if (!userExistente) {
        return res.status(404).json({ message: 'User not found' });
      }      
      const updateUser = {
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password }),
      };
      if (Object.keys(updateUser).length === 0) {
        return res.status(400).json({ message: 'No data to update' });
      }
      
      const userUpdated = await userService.update(parseInt(id), updateUser);
      return res.status(200).json(userUpdated);
    } catch (error: any) {
      console.error('Error updating user:', error);
      // si es un error de Prisma por email duplicado
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // verificar si el usuario existe
      const userExistente = await userService.findById(parseInt(id));
      if (!userExistente) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      await userService.delete(parseInt(id));
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { user, token } = await userService.login(email, password);
      return res.status(200).json({ user, token });
    } catch (error: any) {
      if (error.message === 'User not found') {
        return res.status(401).json({ message: 'Invalid credentials email' });
      }
      if (error.message === 'Invalid Password') {
        return res.status(401).json({ message: 'Invalid credentials password' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

} 