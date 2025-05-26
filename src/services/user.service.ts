import bcrypt from 'bcrypt';
import { BaseService } from './base.service';
import prisma from './prisma.service';
import { UserCreateInput, UserUpdateInput } from '../models/user.model';
import { validatePass } from './passService';
import { generateToken} from './authService';
import { User } from '../models/user.model';
import { UserRole } from '../models/enums';
export class UserService extends BaseService<User, UserCreateInput, UserUpdateInput> {
  protected modelName = 'user';
  protected selectFields = {
    id: true,
    name: true,
    email: true,
    password: false,
  };

  // Override del método create para manejar el hash de la contraseña
  async create(data: UserCreateInput): Promise<User> {
    if (!data.password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return super.create({
      ...data,
      password: hashedPassword,
    });
  }

  // Override del método update para manejar el hash de la contraseña
  async update(id: number, data: UserUpdateInput): Promise<User> {
    let updateData = { ...data };
    
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateData = { ...updateData, password: hashedPassword };
    }

    return super.update(id, updateData);
  }

  // Método específico para encontrar usuario por email (necesario para login)
  async findByEmail(email: string) {
    return (prisma as any).user.findFirst({
      where: { 
        email: {
          equals: email,
          mode: 'insensitive'
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
      },
    });
  }

  // Método específico de login
  async login(email: string, password: string) {
    try {
      const user = await this.findByEmail(email);
      
      if (!user) {
        throw new Error('User not found');
      }

      if (!user.password) {
        throw new Error('Invalid credentials');
      }

      const passwordMatch = await validatePass(password, user.password);
      
      if (!passwordMatch) {
        throw new Error('Invalid Password');
      }

      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role as UserRole
      });

      const { password: _, ...userWithoutPassword } = user;
      return { user: userWithoutPassword, token };
      
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error logging in');
    }
  }
} 
