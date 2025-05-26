import prisma from './prisma/prisma.service';

export abstract class BaseService<T, CreateInput, UpdateInput> {
  protected abstract modelName: string;
  protected abstract selectFields: Record<string, boolean>;

  async findAll(): Promise<T[]> {
    return (prisma as any)[this.modelName].findMany({
      select: this.selectFields,
    });
  }

  async findById(id: number): Promise<T | null> {
    return (prisma as any)[this.modelName].findUnique({
      where: { id },
      select: this.selectFields,
    });
  }

  async create(data: CreateInput): Promise<T> {
    return (prisma as any)[this.modelName].create({
      data,
      select: this.selectFields,
    });
  }

  async update(id: number, data: UpdateInput): Promise<T> {
    return (prisma as any)[this.modelName].update({
      where: { id },
      data,
      select: this.selectFields,
    });
  }

  async delete(id: number): Promise<T> {
    return (prisma as any)[this.modelName].delete({
      where: { id },
      select: this.selectFields,
    });
  }
} 