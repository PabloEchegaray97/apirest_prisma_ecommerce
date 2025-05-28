import bcrypt from 'bcrypt';
import { BaseService } from './base.service';
import prisma from './prisma/prisma.service';
import { UserCreateInput, UserUpdateInput, User } from '../models/user.model';
import { validatePass } from './auth/passService';
import { generateToken} from './auth/authService';
import { UserRole } from '../models/enums';
export class UserService extends BaseService<User, UserCreateInput, UserUpdateInput> {
  protected modelName = 'user';
  protected selectFields = {}; // obj vacio = traer todos los campos

  // incluir relaciones
  protected includeRelations = {
    addresses: {
      include: {
        address: true
      }
    },
    orders: {
      where: { active: true },
      include: {
        details: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
                colour: true,
                images: {
                  where: { isPrincipalProductImage: true }
                }
              }
            }
          }
        },
        userAddress: {
          include: {
            address: true
          }
        }
      }
    }
  };

  // override del metodo create para manejar el hash de la contraseña
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

  // override del metodo update para manejar el hash de la contraseña
  async update(id: number, data: UserUpdateInput): Promise<User> {
    let updateData = { ...data };
    
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateData = { ...updateData, password: hashedPassword };
    }

    return super.update(id, updateData);
  }

  // metodo especifico para encontrar usuario por email (necesario para login)
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

  // metodo especifico de login
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
