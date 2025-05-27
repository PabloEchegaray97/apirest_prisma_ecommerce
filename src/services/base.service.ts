import prisma from './prisma/prisma.service';

export abstract class BaseService<T, CreateInput, UpdateInput> {
  protected abstract modelName: string;
  protected abstract selectFields: Record<string, boolean>;

  async findAll(): Promise<T[]> {
    const hasSelectFields = Object.keys(this.selectFields).length > 0;
    return (prisma as any)[this.modelName].findMany(
      hasSelectFields ? { select: this.selectFields } : {}
    );
  }

  async findById(id: number): Promise<T | null> {
    const hasSelectFields = Object.keys(this.selectFields).length > 0;
    return (prisma as any)[this.modelName].findUnique({
      where: { id },
      ...(hasSelectFields ? { select: this.selectFields } : {})
    });
  }

  async create(data: CreateInput): Promise<T> {
    const hasSelectFields = Object.keys(this.selectFields).length > 0;
    return (prisma as any)[this.modelName].create({
      data,
      ...(hasSelectFields ? { select: this.selectFields } : {})
    });
  }

  async update(id: number, data: UpdateInput): Promise<T> {
    const hasSelectFields = Object.keys(this.selectFields).length > 0;
    return (prisma as any)[this.modelName].update({
      where: { id },
      data,
      ...(hasSelectFields ? { select: this.selectFields } : {})
    });
  }

  async delete(id: number): Promise<T> {
    const hasSelectFields = Object.keys(this.selectFields).length > 0;
    return (prisma as any)[this.modelName].delete({
      where: { id },
      ...(hasSelectFields ? { select: this.selectFields } : {})
    });
  }
} 