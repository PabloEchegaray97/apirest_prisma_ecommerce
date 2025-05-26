import bcrypt from 'bcrypt';
import prisma from './prisma.service';
import { UserCreateInput, UserUpdateInput } from '../models/user.model';
import { validatePass } from './passService';
import { generateToken } from './authService';
import { Prisma } from '../generated/prisma';
import { UserRole } from '../models/enums';

export class UserService {
  async findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
  }

  async create(data: UserCreateInput) {
    if (!data.password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
  }

  async update(id: number, data: UserUpdateInput) {
    let hashedPassword: string | undefined;
    
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    return prisma.user.update({
      where: { id },
      data: {
        ...data,
        ...(hashedPassword && { password: hashedPassword }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
  }

  async delete(id: number) {
    return prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findFirst({
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
